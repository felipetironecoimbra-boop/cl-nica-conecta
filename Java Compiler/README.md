
# Tiny Compiler (Java) - Projeto organizado

Estrutura:
```
tiny-compiler-full/
└── src/
    └── TinyCompiler.java
└── example.tiny
└── run.sh
└── README.md
```

Como compilar e rodar:

Abra um terminal na pasta do projeto e execute:

# Compilar
javac src/TinyCompiler.java

# Rodar com programa de exemplo embutido
java -cp src TinyCompiler

# Ou rode passando um arquivo .tiny como argumento:
java -cp src TinyCompiler example.tiny

O arquivo example.tiny está incluído como exemplo.
