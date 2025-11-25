/*
 TinyCompiler.java
 Compilador mínimo + VM para uma linguagem tiny (atribuições, expressões inteiras, print).
 Coloque este arquivo em src/ e compile com:
   javac src/TinyCompiler.java
   java -cp src TinyCompiler
*/
import java.util.*;
import java.io.*;

public class TinyCompiler {

    /* ----------------- LEXER ----------------- */
    enum TokenType {
        NUMBER, IDENT, PLUS, MINUS, MUL, DIV, LPAREN, RPAREN,
        ASSIGN, SEMI, PRINT, EOF
    }

    static class Token {
        TokenType type;
        String text;
        Token(TokenType t, String s){ type = t; text = s; }
        public String toString(){ return type + (text==null?"":"(" + text + ")"); }
    }

    static class Lexer {
        private final String s;
        private int pos = 0;
        Lexer(String s){ this.s = s; }

        private char peek(){ return pos < s.length() ? s.charAt(pos) : '\0'; }
        private char next(){ return pos < s.length() ? s.charAt(pos++) : '\0'; }

        List<Token> tokenize(){
            List<Token> out = new ArrayList<>();
            while(true){
                char c = peek();
                if(c == '\0'){ out.add(new Token(TokenType.EOF, null)); break; }
                if(Character.isWhitespace(c)){ next(); continue; }
                if(Character.isDigit(c)){
                    StringBuilder sb = new StringBuilder();
                    while(Character.isDigit(peek())) sb.append(next());
                    out.add(new Token(TokenType.NUMBER, sb.toString()));
                    continue;
                }
                if(Character.isLetter(c) || c == '_'){
                    StringBuilder sb = new StringBuilder();
                    while(Character.isLetterOrDigit(peek()) || peek() == '_') sb.append(next());
                    String id = sb.toString();
                    if(id.equals("print")) out.add(new Token(TokenType.PRINT, id));
                    else out.add(new Token(TokenType.IDENT, id));
                    continue;
                }
                switch(c){
                    case '+': next(); out.add(new Token(TokenType.PLUS, "+")); break;
                    case '-': next(); out.add(new Token(TokenType.MINUS, "-")); break;
                    case '*': next(); out.add(new Token(TokenType.MUL, "*")); break;
                    case '/': next(); out.add(new Token(TokenType.DIV, "/")); break;
                    case '(': next(); out.add(new Token(TokenType.LPAREN, "(")); break;
                    case ')': next(); out.add(new Token(TokenType.RPAREN, ")")); break;
                    case ';': next(); out.add(new Token(TokenType.SEMI, ";")); break;
                    case '=': next(); out.add(new Token(TokenType.ASSIGN, "=")); break;
                    default:
                        throw new RuntimeException("Caracter inválido: '" + c + "' at pos " + pos);
                }
            }
            return out;
        }
    }

    /* ----------------- PARSER (AST) ----------------- */
    abstract static class Stmt {}
    static class AssignStmt extends Stmt {
        String name; Expr expr;
        AssignStmt(String n, Expr e){ name = n; expr = e; }
    }
    static class PrintStmt extends Stmt {
        Expr expr;
        PrintStmt(Expr e){ expr = e; }
    }

    abstract static class Expr {}
    static class NumberExpr extends Expr {
        int value; NumberExpr(int v){ value = v; }
    }
    static class VarExpr extends Expr {
        String name; VarExpr(String n){ name = n; }
    }
    static class BinaryExpr extends Expr {
        Expr left; String op; Expr right;
        BinaryExpr(Expr l, String op, Expr r){ left=l; this.op = op; right=r; }
    }

    static class Parser {
        private final List<Token> tokens;
        private int idx = 0;
        Parser(List<Token> tokens){ this.tokens = tokens; }

        private Token peek(){ return tokens.get(idx); }
        private Token next(){ return tokens.get(idx++); }
        private boolean accept(TokenType t){
            if(peek().type == t){ next(); return true; }
            return false;
        }
        private void expect(TokenType t){
            if(peek().type != t) throw new RuntimeException("Esperado " + t + " mas encontrou " + peek());
            next();
        }

        List<Stmt> parseProgram(){
            List<Stmt> stmts = new ArrayList<>();
            while(peek().type != TokenType.EOF){
                stmts.add(parseStmt());
            }
            return stmts;
        }

        private Stmt parseStmt(){
            Token p = peek();
            if(p.type == TokenType.IDENT){
                Token id = next();
                expect(TokenType.ASSIGN);
                Expr e = parseExpr();
                expect(TokenType.SEMI);
                return new AssignStmt(id.text, e);
            } else if(p.type == TokenType.PRINT){
                next();
                Expr e = parseExpr();
                expect(TokenType.SEMI);
                return new PrintStmt(e);
            } else {
                throw new RuntimeException("Stmt inválido inicia com: " + p);
            }
        }

        // recursive descent: expr -> term ( (+|-) term )*
        private Expr parseExpr(){
            Expr left = parseTerm();
            while(peek().type == TokenType.PLUS || peek().type == TokenType.MINUS){
                String op = next().text;
                Expr right = parseTerm();
                left = new BinaryExpr(left, op, right);
            }
            return left;
        }
        // term -> factor ( (*|/) factor )*
        private Expr parseTerm(){
            Expr left = parseFactor();
            while(peek().type == TokenType.MUL || peek().type == TokenType.DIV){
                String op = next().text;
                Expr right = parseFactor();
                left = new BinaryExpr(left, op, right);
            }
            return left;
        }
        // factor -> NUMBER | IDENT | (expr)
        private Expr parseFactor(){
            Token t = peek();
            if(accept(TokenType.NUMBER)){
                return new NumberExpr(Integer.parseInt(t.text));
            } else if(accept(TokenType.IDENT)){
                return new VarExpr(t.text);
            } else if(accept(TokenType.LPAREN)){
                Expr e = parseExpr();
                expect(TokenType.RPAREN);
                return e;
            } else {
                throw new RuntimeException("Factor inválido: " + t);
            }
        }
    }

    /* ----------------- BYTECODE & COMPILER ----------------- */
    enum Op {
        PUSH_CONST, LOAD, STORE, ADD, SUB, MUL, DIV, PRINT, HALT
    }

    static class Instr {
        Op op;
        int arg;      // usado para números / índices / constantes
        String meta;  // opcional (nome de variável) para debug
        Instr(Op op){ this(op, 0, null); }
        Instr(Op op, int arg){ this(op, arg, null); }
        Instr(Op op, int arg, String meta){ this.op = op; this.arg = arg; this.meta = meta; }
        public String toString(){ return op + (op==Op.PUSH_CONST?(" " + arg): (meta!=null?(" "+meta):"")); }
    }

    static class Compiler {
        List<Integer> constants = new ArrayList<>();
        Map<String,Integer> varIndex = new HashMap<>();
        int nextVarSlot = 0;
        List<Instr> code = new ArrayList<>();

        void compile(List<Stmt> program){
            for(Stmt s: program){
                compileStmt(s);
            }
            code.add(new Instr(Op.HALT));
        }

        private void compileStmt(Stmt s){
            if(s instanceof AssignStmt){
                AssignStmt a = (AssignStmt)s;
                compileExpr(a.expr);
                int slot = varIndex.computeIfAbsent(a.name, k -> nextVarSlot++);
                code.add(new Instr(Op.STORE, slot, a.name));
            } else if(s instanceof PrintStmt){
                PrintStmt p = (PrintStmt)s;
                compileExpr(p.expr);
                code.add(new Instr(Op.PRINT));
            } else {
                throw new RuntimeException("Stmt desconhecido: " + s);
            }
        }

        private void compileExpr(Expr e){
            if(e instanceof NumberExpr){
                NumberExpr n = (NumberExpr)e;
                int idx = constants.indexOf(n.value);
                if(idx == -1){
                    constants.add(n.value);
                    idx = constants.size()-1;
                }
                code.add(new Instr(Op.PUSH_CONST, idx));
            } else if(e instanceof VarExpr){
                VarExpr v = (VarExpr)e;
                Integer slot = varIndex.get(v.name);
                if(slot == null) throw new RuntimeException("Variável não inicializada: " + v.name);
                code.add(new Instr(Op.LOAD, slot, v.name));
            } else if(e instanceof BinaryExpr){
                BinaryExpr b = (BinaryExpr)e;
                compileExpr(b.left);
                compileExpr(b.right);
                switch(b.op){
                    case "+": code.add(new Instr(Op.ADD)); break;
                    case "-": code.add(new Instr(Op.SUB)); break;
                    case "*": code.add(new Instr(Op.MUL)); break;
                    case "/": code.add(new Instr(Op.DIV)); break;
                    default: throw new RuntimeException("Operador desconhecido: " + b.op);
                }
            } else {
                throw new RuntimeException("Expr desconhecida: " + e);
            }
        }
    }

    /* ----------------- VIRTUAL MACHINE ----------------- */
    static class VM {
        List<Integer> constants;
        List<Instr> code;
        int ip = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        int[] locals;

        VM(List<Integer> consts, List<Instr> code, int localCount){
            this.constants = consts;
            this.code = code;
            this.locals = new int[localCount];
        }

        void run(){
            while(ip < code.size()){
                Instr ins = code.get(ip++);
                switch(ins.op){
                    case PUSH_CONST:
                        stack.push(constants.get(ins.arg));
                        break;
                    case LOAD:
                        stack.push(locals[ins.arg]);
                        break;
                    case STORE:
                        locals[ins.arg] = stack.pop();
                        break;
                    case ADD:{
                        int b = stack.pop(), a = stack.pop();
                        stack.push(a + b); break;
                    }
                    case SUB:{
                        int b = stack.pop(), a = stack.pop();
                        stack.push(a - b); break;
                    }
                    case MUL:{
                        int b = stack.pop(), a = stack.pop();
                        stack.push(a * b); break;
                    }
                    case DIV:{
                        int b = stack.pop(), a = stack.pop();
                        stack.push(a / b); break;
                    }
                    case PRINT:
                        System.out.println(stack.pop());
                        break;
                    case HALT:
                        return;
                    default:
                        throw new RuntimeException("Op desconhecida: " + ins.op);
                }
            }
        }
    }

    /* ----------------- MAIN (exemplo + leitura de arquivo) ----------------- */
    public static void main(String[] args) throws Exception {
        String program = null;

        if(args.length == 0){
            // exemplo embutido
            program =
                "x = 10;\n" +
                "y = 20;\n" +
                "z = x * (y + 2);\n" +
                "print z;\n" +
                "print (z + x) / 2;\n";
            System.out.println("Nenhum arquivo passado. Usando programa exemplo.\n");
        } else {
            // ler arquivo passado como argumento
            program = new String(java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(args[0])), "UTF-8");
            System.out.println("Programa fonte carregado de: " + args[0] + "\n");
        }

        System.out.println("Programa fonte:\n" + program);

        // 1) Tokenize
        Lexer lexer = new Lexer(program);
        List<Token> tokens = lexer.tokenize();

        // 2) Parse
        Parser parser = new Parser(tokens);
        List<Stmt> stmts = parser.parseProgram();

        // 3) Compile
        Compiler compiler = new Compiler();
        compiler.compile(stmts);

        // 4) Mostrar bytecode gerado (debug)
        System.out.println("Constantes: " + compiler.constants);
        System.out.println("Variáveis (slots): " + compiler.varIndex);
        System.out.println("Bytecode:");
        for(int i=0;i<compiler.code.size();i++){
            System.out.printf("%03d: %s\n", i, compiler.code.get(i));
        }

        // 5) Run on VM
        VM vm = new VM(compiler.constants, compiler.code, compiler.nextVarSlot);
        System.out.println("\nSaída do programa:");
        vm.run();
    }
}