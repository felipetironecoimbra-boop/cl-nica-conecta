import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, BarChart3, Clock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Sistema Omnichannel para Clínicas Médicas
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unifique todos os canais de atendimento em uma única plataforma. 
            WhatsApp, Instagram, Facebook, E-mail e Chat integrados.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login">
              <Button size="lg" className="text-lg px-8">
                Acessar Sistema
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <MessageSquare className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Atendimento Unificado</CardTitle>
              <CardDescription>
                Todos os canais em uma única caixa de entrada. Responda mensagens de WhatsApp, 
                Instagram, Facebook e E-mail sem trocar de plataforma.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <Users className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Gestão de Equipe</CardTitle>
              <CardDescription>
                Distribua atendimentos, monitore produtividade e gerencie sua equipe 
                de forma eficiente com ferramentas completas de supervisão.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Relatórios e Métricas</CardTitle>
              <CardDescription>
                Acompanhe KPIs em tempo real: tempo de resposta, taxa de conversão, 
                satisfação do paciente e produtividade da equipe.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <Clock className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Histórico Completo</CardTitle>
              <CardDescription>
                Acesse todo o histórico de conversas com pacientes, independente 
                do canal usado. Informações sempre disponíveis.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Segurança LGPD</CardTitle>
              <CardDescription>
                Sistema em conformidade com LGPD e normas de sigilo médico. 
                Dados criptografados e controle de acesso por perfil.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-smooth">
            <CardHeader>
              <Zap className="h-12 w-12 text-secondary mb-4" />
              <CardTitle>Automação Inteligente</CardTitle>
              <CardDescription>
                Respostas automáticas, lembretes de consulta, confirmações de agendamento 
                e mensagens programadas para aumentar eficiência.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Benefícios do Sistema</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Para a Clínica</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Organização centralizada</li>
                  <li>✓ Redução de tempo de resposta</li>
                  <li>✓ Aumento de consultas agendadas</li>
                  <li>✓ Menor perda de pacientes</li>
                  <li>✓ Melhor imagem institucional</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Para os Pacientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Conveniência no atendimento</li>
                  <li>✓ Respostas mais rápidas</li>
                  <li>✓ Canal de preferência</li>
                  <li>✓ Histórico acessível</li>
                  <li>✓ Lembretes automáticos</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Para Gerentes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Visão completa da operação</li>
                  <li>✓ Métricas em tempo real</li>
                  <li>✓ Identificação de gargalos</li>
                  <li>✓ Gestão de equipe eficiente</li>
                  <li>✓ Decisões baseadas em dados</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto para transformar seu atendimento?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Comece agora e veja como o sistema omnichannel pode revolucionar 
          a comunicação da sua clínica com os pacientes.
        </p>
        <Link to="/login">
          <Button size="lg" className="text-lg px-12">
            Experimentar Agora
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
