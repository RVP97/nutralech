"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Camera,
  Check,
  ChevronLeft,
  Clock,
  History,
  MessageCircle,
  MoreVertical,
  Phone,
  Send,
  Settings,
  ThumbsUp,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  sender: string;
  message: string;
  time: string;
  read: boolean;
}

interface Conversations {
  [key: number]: Message[];
}

// Mock conversations for each patient
const initialConversations = {
  1: [
    {
      id: 1,
      sender: "You",
      message: "Hola, ¿cómo te sientes con tu dieta?",
      time: "10:20 AM",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "Me siento bien, pero tengo dudas sobre el desayuno.",
      time: "10:21 AM",
      read: true,
    },
    {
      id: 3,
      sender: "You",
      message: "Es importante incluir proteínas. ¿Qué sueles desayunar?",
      time: "10:21 AM",
      read: true,
    },
    {
      id: 4,
      sender: "Marialy",
      message: "Generalmente solo café.",
      time: "10:22 AM",
      read: true,
    },
  ],
  2: [
    {
      id: 1,
      sender: "You",
      message: "Buenos días, ¿cómo va tu progreso?",
      time: "09:40 AM",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "He perdido un poco de peso, pero me siento cansado.",
      time: "09:45 AM",
      read: false,
    },
    {
      id: 3,
      sender: "You",
      message: "Recuerda hidratarte bien y comer snacks saludables.",
      time: "09:45 AM",
      read: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "You",
      message: "Aquí tienes tu plan de comidas para la semana.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "Gracias, lo seguiré al pie de la letra.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 3,
      sender: "You",
      message: "¿Cómo te fue con las recetas nuevas?",
      time: "Yesterday",
      read: true,
    },
    {
      id: 4,
      sender: "Marialy",
      message: "¡Excelentes! Especialmente la de quinoa.",
      time: "10:30 AM",
      read: false,
    },
  ],
  4: [
    {
      id: 1,
      sender: "You",
      message: "He revisado tus últimos análisis.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "¿Qué tal están mis resultados?",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      sender: "You",
      message: "Todo está mejorando, el colesterol bajó significativamente.",
      time: "11:15 AM",
      read: true,
    },
  ],
  5: [
    {
      id: 1,
      sender: "You",
      message: "¿Cómo vas con los ejercicios recomendados?",
      time: "Monday",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "Me está costando mantener la rutina matutina.",
      time: "Monday",
      read: true,
    },
    {
      id: 3,
      sender: "You",
      message: "Podemos ajustar el horario, ¿qué te parece por la tarde?",
      time: "09:20 AM",
      read: true,
    },
  ],
  6: [
    {
      id: 1,
      sender: "Marialy",
      message: "¿Puedo tomar batidos proteicos después de cenar?",
      time: "Yesterday",
      read: true,
    },
    {
      id: 2,
      sender: "You",
      message: "Es mejor tomarlos post-entrenamiento o en el desayuno",
      time: "08:45 AM",
      read: true,
    },
  ],
  7: [
    {
      id: 1,
      sender: "You",
      message: "¿Cómo te sientes después de una semana con el nuevo plan?",
      time: "Monday",
      read: true,
    },
    {
      id: 2,
      sender: "Marialy",
      message: "¡Tengo mucha más energía! Gracias por los ajustes.",
      time: "11:30 AM",
      read: false,
    },
  ],
};

// Update the patients array to be a function that gets the last message
const getPatients = (conversations: Conversations) => [
  {
    id: 1,
    name: "Juan Pérez",
    lastMessage: conversations[1][conversations[1].length - 1].message,
    time: conversations[1][conversations[1].length - 1].time,
    unread: 0,
    avatar: "/images/avatar/gabriel.webp",
  },
  {
    id: 2,
    name: "Ana Gómez",
    lastMessage: conversations[2][conversations[2].length - 1].message,
    time: conversations[2][conversations[2].length - 1].time,
    unread: 2,
    avatar: "/images/avatar/luisa.webp",
  },
  {
    id: 3,
    name: "Carla Allens",
    lastMessage: conversations[3][conversations[3].length - 1].message,
    time: conversations[3][conversations[3].length - 1].time,
    unread: 1,
    avatar: "/images/avatar/maria.webp",
  },
  {
    id: 4,
    name: "María Sánchez",
    lastMessage: conversations[4][conversations[4].length - 1].message,
    time: conversations[4][conversations[4].length - 1].time,
    unread: 0,
    avatar: "/images/avatar/sandra.webp",
  },
];

function Iphone15ProWhatsappLightSmaller() {
  const [activeView, setActiveView] = useState("main");
  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [conversations, setConversations] = useState(initialConversations);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chats");
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [currentTime, setCurrentTime] = useState(() => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
  });
  const [patientsList, setPatientsList] = useState(
    getPatients(initialConversations)
  );

  // Update patientsList when conversations change
  useEffect(() => {
    setPatientsList(getPatients(conversations));
  }, [conversations]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openConversation = (patientId) => {
    setActiveConversation(patientId);
    setActiveView("conversation");
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = (
        scrollAreaRef.current as HTMLDivElement
      ).querySelector("[data-radix-scroll-area-viewport]");
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (activeView === "conversation") {
      scrollToBottom();
    }
  }, [conversations, activeView]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg = {
      id: conversations[activeConversation].length + 1,
      sender: "You",
      message: newMessage,
      time: currentTime,
      read: true,
    };

    setConversations((prevConversations) => ({
      ...prevConversations,
      [activeConversation]: [...prevConversations[activeConversation], newMsg],
    }));

    setNewMessage("");
  };

  const tabs = [
    { id: "updates", icon: History, label: "Updates", notifications: 0 },
    { id: "calls", icon: Phone, label: "Calls", notifications: 2 },
    { id: "communities", icon: Users, label: "Communities", notifications: 0 },
    { id: "chats", icon: MessageCircle, label: "Chats", notifications: 3 },
    { id: "settings", icon: Settings, label: "Settings", notifications: 0 },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-[300px] h-[650px] bg-black rounded-[45px] shadow-xl overflow-hidden">
        {/* iPhone frame */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[25px] bg-black rounded-b-3xl z-20"></div>

          {/* Screen content */}
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-white m-[10px] rounded-[35px] overflow-hidden">
            {/* Status bar */}
            <div className="flex justify-between items-center px-4 h-6 bg-[#008069] text-white text-xs">
              <span className="font-medium">{currentTime}</span>
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                </svg>
                <div className="flex items-center">
                  <div className="w-5 h-2 bg-white rounded-sm relative">
                    <div className="absolute top-0.5 bottom-0.5 left-0.5 right-1 bg-[#008069] rounded-sm" />
                  </div>
                  <span className="text-[8px] ml-0.5">89%</span>
                </div>
              </div>
            </div>

            {activeView === "main" ? (
              <>
                {/* Main menu header */}
                <div className="bg-[#008069] text-white px-3 pb-3 pt-1">
                  <h2 className="text-xl font-bold">WhatsApp</h2>
                </div>

                {/* Patient list */}
                <ScrollArea className="h-[calc(100%-120px)] bg-white">
                  <div>
                    {patientsList.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
                        onClick={() => openConversation(patient.id)}
                      >
                        <Avatar className="w-10 h-10 rounded-full">
                          <AvatarImage
                            src={patient.avatar}
                            alt={patient.name}
                          />
                          <AvatarFallback>
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0 ml-3">
                          <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {patient.name}
                            </h3>
                            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                              {patient.time}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500 truncate pr-4">
                              {patient.lastMessage}
                            </p>
                            {patient.unread > 0 && (
                              <span className="flex-shrink-0 inline-flex items-center justify-center w-4 h-4 bg-[#25D366] text-white rounded-full text-[10px]">
                                {patient.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Bottom Navigation */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t border-gray-200 flex justify-around items-center">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative flex flex-col items-center justify-center w-full h-full"
                    >
                      <div
                        className={`flex flex-col items-center ${
                          activeTab === tab.id
                            ? "text-[#008069]"
                            : "text-gray-500"
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="text-[8px] mt-0.5">{tab.label}</span>
                        {tab.notifications > 0 && (
                          <span className="absolute top-0 right-1/4 flex items-center justify-center w-3 h-3 bg-[#25D366] text-white text-[8px] rounded-full">
                            {tab.notifications}
                          </span>
                        )}
                      </div>
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#008069]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Conversation header */}
                <div className="bg-[#008069] text-white p-2 flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-[#006e5a] p-1"
                    onClick={() => setActiveView("main")}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        patientsList.find((p) => p.id === activeConversation)
                          ?.avatar
                      }
                      alt={
                        patientsList.find((p) => p.id === activeConversation)
                          ?.name
                      }
                    />
                    <AvatarFallback>
                      {patientsList
                        .find((p) => p.id === activeConversation)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="font-semibold text-sm">
                      {
                        patientsList.find((p) => p.id === activeConversation)
                          ?.name
                      }
                    </h2>
                    <p className="text-[10px]">online</p>
                  </div>
                  <Link
                    prefetch={false}
                    href="https://wa.me/message/BLYZCVYW2MOAJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white hover:bg-[#006e5a] p-1 rounded-md"
                  >
                    <Video className="h-4 w-4" />
                  </Link>
                  <Link
                    prefetch={false}
                    href="https://wa.me/message/BLYZCVYW2MOAJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white hover:bg-[#006e5a] p-1 rounded-md"
                  >
                    <Phone className="h-4 w-4" />
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-white hover:bg-[#006e5a] p-1"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>

                {/* Chat messages */}
                <ScrollArea
                  className="h-[calc(100%-118px)] bg-[#efeae2] p-3"
                  ref={scrollAreaRef}
                  data-testid="chat-messages"
                >
                  <div className="space-y-3 pb-8">
                    {conversations[activeConversation]?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`max-w-[70%] ${
                          msg.sender === "You"
                            ? "ml-auto bg-[#d9fdd3]"
                            : "bg-white"
                        } rounded-lg p-2 shadow-sm`}
                      >
                        <p className="text-xs text-gray-800">{msg.message}</p>
                        <div className="flex justify-end items-center mt-1 space-x-1">
                          <p className="text-right text-[10px] text-gray-500">
                            {msg.time}
                          </p>
                          {msg.sender === "You" && (
                            <div className="flex">
                              <Check
                                className={`h-2 w-2 ${
                                  msg.read ? "text-[#53bdeb]" : "text-gray-400"
                                }`}
                              />
                              <Check
                                className={`h-2 w-2 -ml-1 ${
                                  msg.read ? "text-[#53bdeb]" : "text-gray-400"
                                }`}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message input */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#f0f2f5] p-2 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#54656f] p-1"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 bg-white text-gray-800 placeholder-gray-500 rounded-full mx-1 text-xs h-8 focus:outline-none border-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#54656f] p-1"
                    onClick={sendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute top-[100px] left-[-2px] w-[3px] h-[28px] bg-gray-800 rounded-r"></div>
        <div className="absolute top-[140px] left-[-2px] w-[3px] h-[50px] bg-gray-800 rounded-r"></div>
        <div className="absolute top-[100px] right-[-2px] w-[3px] h-[80px] bg-gray-800 rounded-l"></div>
      </div>
    </div>
  );
}

export default function PersonalizedCommunicationSection() {
  const features = [
    {
      icon: MessageCircle,
      title: "Comunicación Directa",
      description:
        "Estoy siempre disponible para responder tus preguntas y brindarte apoyo personalizado a través de nuestra plataforma de mensajería segura.",
    },
    {
      icon: Clock,
      title: "Respuestas Rápidas",
      description:
        "Me comprometo a responder a tus mensajes en un plazo máximo de 24 horas, asegurando que recibas la atención que necesitas de manera oportuna.",
    },
    {
      icon: ThumbsUp,
      title: "Seguimiento Personalizado",
      description:
        "Adapto mi enfoque a tus necesidades individuales, ofreciendo consejos y ajustes personalizados a tu plan nutricional según tu progreso.",
    },
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-white to-pink-50/50">
      {/* Add decorative elements from hero.tsx */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjE4LCA5NSwgMTExLCAwLjA3KSIvPjwvc3ZnPg==')] opacity-40" />
      <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[#DA5F6F]/20 blur-[128px] animate-pulse" />
      <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-yellow-200/30 blur-[128px] animate-pulse [animation-delay:1000ms]" />

      {/* Add bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="text-lg text-[#DA5F6F]">Acceso Directo</span>
          <h2 className="mt-4 text-4xl font-serif font-medium tracking-tight sm:text-5xl">
            Comunicación Personalizada
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground">
              Tu éxito es mi prioridad. Por eso, ofrezco una atención
              completamente personalizada a través de una plataforma de
              comunicación segura y fácil de usar. Estoy aquí para apoyarte en
              cada paso de tu viaje hacia una mejor salud y nutrición.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#DA5F6F]/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-[#DA5F6F]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#DA5F6F]/20 to-transparent rounded-[45px] blur-xl" />
            <div className="relative">
              <Iphone15ProWhatsappLightSmaller />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
