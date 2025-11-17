import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Phone, Mail, Facebook, Instagram, Clock, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Conversation {
  id: string;
  patient: string;
  channel: "whatsapp" | "instagram" | "facebook" | "email" | "phone";
  lastMessage: string;
  time: string;
  unread: number;
  status: "active" | "waiting" | "resolved";
}

const DashboardAtendente = () => {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [message, setMessage] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      patient: "Maria Silva",
      channel: "whatsapp",
      lastMessage: "Gostaria de agendar uma consulta",
      time: "10:30",
      unread: 2,
      status: "active"
    },
    {
      id: "2",
      patient: "João Santos",
      channel: "instagram",
      lastMessage: "Qual o horário de funcionamento?",
      time: "09:45",
      unread: 1,
      status: "waiting"
    },
    {
      id: "3",
      patient: "Ana Costa",
      channel: "facebook",
      lastMessage: "Obrigada pelo atendimento!",
      time: "Ontem",
      unread: 0,
      status: "resolved"
    },
    {
      id: "4",
      patient: "Pedro Oliveira",
      channel: "email",
      lastMessage: "Preciso remarcar minha consulta",
      time: "Ontem",
      unread: 0,
      status: "active"
    },
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "whatsapp": return "💬";
      case "instagram": return <Instagram className="h-4 w-4" />;
      case "facebook": return <Facebook className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "waiting": return "bg-warning";
      case "resolved": return "bg-muted";
      default: return "bg-muted";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Atendente</h1>
              <p className="text-sm text-muted-foreground">Atendente: Ana Paula</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r bg-card flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar conversas..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
                    selectedConversation === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{conv.patient[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm truncate">{conv.patient}</span>
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs">
                          {getChannelIcon(conv.channel)}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor(conv.status)}`} />
                          {conv.unread > 0 && (
                            <Badge variant="default" className="h-5 px-2">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Maria Silva</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>WhatsApp</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Ativo agora
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Ver Histórico</Button>
                <Button variant="outline" size="sm">Agendar Consulta</Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-md">
                  <p className="text-sm">Olá, boa tarde!</p>
                  <p className="text-xs text-muted-foreground mt-1">10:25</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-md">
                  <p className="text-sm">Gostaria de agendar uma consulta com o Dr. Roberto para a próxima semana</p>
                  <p className="text-xs text-muted-foreground mt-1">10:30</p>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-md">
                  <p className="text-sm">Olá Maria! Com certeza, vou verificar a agenda do Dr. Roberto.</p>
                  <p className="text-xs opacity-70 mt-1">10:31</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex gap-2 justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-md">
                  <p className="text-sm">Temos disponibilidade na terça-feira às 14h ou na quinta às 10h. Qual horário prefere?</p>
                  <p className="text-xs opacity-70 mt-1">10:32</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="border-t bg-card p-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Digite sua mensagem..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setMessage("");
                  }
                }}
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Resposta Rápida</Button>
              <Button variant="outline" size="sm">Agendar</Button>
              <Button variant="outline" size="sm">Encaminhar</Button>
            </div>
          </div>
        </div>

        {/* Patient Info Sidebar */}
        <div className="w-80 border-l bg-card p-4 overflow-auto">
          <h3 className="font-semibold mb-4">Informações do Paciente</h3>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Maria Silva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Telefone</p>
                <p className="font-medium">(11) 98765-4321</p>
              </div>
              <div>
                <p className="text-muted-foreground">E-mail</p>
                <p className="font-medium">maria.silva@email.com</p>
              </div>
              <div>
                <p className="text-muted-foreground">Última consulta</p>
                <p className="font-medium">15/10/2024</p>
              </div>
              <div>
                <p className="text-muted-foreground">Médico</p>
                <p className="font-medium">Dr. Roberto Alves</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <Badge variant="outline" className="bg-success/10 text-success">Ativo</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Ações Rápidas</h4>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Agendar Consulta
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Ver Prontuário
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                Enviar Lembrete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAtendente;
