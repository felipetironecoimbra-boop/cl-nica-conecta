import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (role: "atendente" | "gerente") => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === "atendente") {
        navigate("/dashboard-atendente");
      } else {
        navigate("/dashboard-gerente");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Sistema Omnichannel</CardTitle>
          <CardDescription>Acesse sua conta para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="atendente">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="atendente">Atendente</TabsTrigger>
              <TabsTrigger value="gerente">Gerente</TabsTrigger>
            </TabsList>
            
            <TabsContent value="atendente">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin("atendente"); }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-atendente">E-mail</Label>
                    <Input 
                      id="email-atendente" 
                      type="email" 
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-atendente">Senha</Label>
                    <Input 
                      id="password-atendente" 
                      type="password" 
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar como Atendente"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="gerente">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin("gerente"); }}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-gerente">E-mail</Label>
                    <Input 
                      id="email-gerente" 
                      type="email" 
                      placeholder="gerente@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-gerente">Senha</Label>
                    <Input 
                      id="password-gerente" 
                      type="password" 
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Entrando..." : "Entrar como Gerente"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Ambiente de demonstração</p>
            <p className="mt-1">Use qualquer e-mail e senha para acessar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
