import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, MessageSquare, Clock, TrendingUp, LogOut, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardGerente = () => {
  const navigate = useNavigate();

  const atendentes = [
    { 
      nome: "Ana Paula", 
      status: "online", 
      atendimentos: 15, 
      tempoMedio: "3m 25s", 
      satisfacao: 4.8,
      emAtendimento: 3 
    },
    { 
      nome: "Carlos Mendes", 
      status: "online", 
      atendimentos: 12, 
      tempoMedio: "4m 10s", 
      satisfacao: 4.6,
      emAtendimento: 2 
    },
    { 
      nome: "Juliana Lima", 
      status: "pausa", 
      atendimentos: 8, 
      tempoMedio: "5m 30s", 
      satisfacao: 4.5,
      emAtendimento: 0 
    },
    { 
      nome: "Roberto Silva", 
      status: "online", 
      atendimentos: 18, 
      tempoMedio: "2m 50s", 
      satisfacao: 4.9,
      emAtendimento: 4 
    },
  ];

  const canaisMetricas = [
    { canal: "WhatsApp", conversas: 45, taxa: "92%", cor: "text-success" },
    { canal: "Instagram", conversas: 28, taxa: "85%", cor: "text-secondary" },
    { canal: "Facebook", conversas: 15, taxa: "78%", cor: "text-primary" },
    { canal: "E-mail", conversas: 12, taxa: "95%", cor: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Gerente</h1>
              <p className="text-sm text-muted-foreground">Visão geral da operação</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* KPIs Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Atendimentos Hoje
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">53</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% vs ontem
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tempo Médio Resposta
              </CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3m 54s</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                -18% melhor
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taxa de Conversão
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +5% este mês
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Atendentes Online
              </CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3 / 4</div>
              <p className="text-xs text-muted-foreground mt-1">
                1 em pausa
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance por Canal */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {canaisMetricas.map((canal) => (
                <div key={canal.canal} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-medium w-32">{canal.canal}</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${canal.cor.replace('text-', 'bg-')}`}
                        style={{ width: canal.taxa }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <span className="text-sm text-muted-foreground w-20 text-right">
                      {canal.conversas} conversas
                    </span>
                    <Badge variant="outline" className={canal.cor}>
                      {canal.taxa}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Atendentes */}
        <Card>
          <CardHeader>
            <CardTitle>Desempenho da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atendente</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Atendimentos</TableHead>
                  <TableHead className="text-right">Em Atendimento</TableHead>
                  <TableHead className="text-right">Tempo Médio</TableHead>
                  <TableHead className="text-right">Satisfação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atendentes.map((atendente) => (
                  <TableRow key={atendente.nome}>
                    <TableCell className="font-medium">{atendente.nome}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          atendente.status === "online" 
                            ? "bg-success/10 text-success" 
                            : "bg-warning/10 text-warning"
                        }
                      >
                        {atendente.status === "online" ? "Online" : "Em Pausa"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{atendente.atendimentos}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{atendente.emAtendimento}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{atendente.tempoMedio}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span>⭐</span>
                        <span>{atendente.satisfacao}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Redistribuir Filas</Button>
              <Button variant="outline">Gerar Relatório</Button>
              <Button variant="outline">Ver Conversas em Tempo Real</Button>
              <Button variant="outline">Gerenciar Equipe</Button>
              <Button variant="outline">Configurações</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardGerente;
