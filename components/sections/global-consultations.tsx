"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Globe, MessageCircle, Moon, Sun, Video } from "lucide-react";
import { useEffect, useState } from "react";

const locations = [
  {
    city: "Nueva York",
    country: "Estados Unidos",
    timezone: "EST",
    flag: "🇺🇸",
    offset: -5,
  },
  {
    city: "Londres",
    country: "Reino Unido",
    timezone: "GMT",
    flag: "🇬🇧",
    offset: 0,
  },
  { city: "Tokio", country: "Japón", timezone: "JST", flag: "🇯🇵", offset: 9 },
  {
    city: "CDMX",
    country: "México",
    timezone: "CST",
    flag: "🇲🇽",
    offset: -6,
  },
  {
    city: "Bogotá",
    country: "Colombia",
    timezone: "COT",
    flag: "🇨🇴",
    offset: -5,
  },
  {
    city: "Río de Janeiro",
    country: "Brasil",
    timezone: "BRT",
    flag: "🇧🇷",
    offset: -3,
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    timezone: "ART",
    flag: "🇦🇷",
    offset: -3,
  },
];

const features = [
  {
    icon: Clock,
    title: "Flexibilidad Horaria",
    description: "Consultas adaptadas a tu zona horaria",
  },
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Atención desde cualquier parte del mundo",
  },
  {
    icon: Video,
    title: "Consultas Virtuales",
    description: "Sesiones por videollamada de alta calidad",
  },
  {
    icon: MessageCircle,
    title: "Soporte Continuo",
    description: "Seguimiento y apoyo entre sesiones",
  },
];

export default function GlobalConsultations() {
  const [activeLocation, setActiveLocation] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % locations.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLocalTime = (offset: number) => {
    const utcTime = new Date(
      currentTime.getTime() + currentTime.getTimezoneOffset() * 60000
    );
    const localTime = new Date(utcTime.getTime() + offset * 3600000);
    return localTime.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isDaytime = (offset: number) => {
    const utcTime = new Date(
      currentTime.getTime() + currentTime.getTimezoneOffset() * 60000
    );
    const localHour = new Date(utcTime.getTime() + offset * 3600000).getHours();
    return localHour >= 6 && localHour < 18;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-pink-50/50 to-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl text-center mb-8">
          Nutrición Sin Fronteras
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Transformando vidas a través de la nutrición personalizada, sin
          importar dónde te encuentres en el mundo.
        </p>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-12">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-6">Alcance Global</h3>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={locations[activeLocation].city}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">
                        {locations[activeLocation].flag}
                      </span>
                      <span className="text-sm font-medium bg-white px-3 py-1 rounded-full">
                        {locations[activeLocation].timezone}
                      </span>
                    </div>
                    <h4 className="text-2xl font-semibold mb-2">
                      {locations[activeLocation].city}
                    </h4>
                    <p className="text-lg text-muted-foreground mb-4">
                      {locations[activeLocation].country}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-medium">
                        {getLocalTime(locations[activeLocation].offset)}
                      </span>
                      {isDaytime(locations[activeLocation].offset) ? (
                        <Sun className="w-8 h-8 text-yellow-500" />
                      ) : (
                        <Moon className="w-8 h-8 text-blue-500" />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div>
                  <h4 className="text-lg font-semibold mb-3">
                    Explora Otras Localizaciones
                  </h4>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-none sm:flex sm:flex-wrap">
                    {locations.map((location, index) => (
                      <motion.button
                        key={location.city}
                        className={`w-full sm:w-auto px-4 py-2 rounded-full text-sm ${
                          index === activeLocation
                            ? "bg-[#DA5F6F] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveLocation(index)}
                      >
                        {location.flag} {location.city}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Nuestros Servicios Globales
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <feature.icon className="w-8 h-8 text-[#DA5F6F] mb-3" />
                      <h5 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#DA5F6F] text-white p-4 text-center">
            <p className="text-lg font-semibold">
              Atendiendo a clientes en 6 continentes
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Desde consultas en línea hasta planes de nutrición adaptados a tu
            zona horaria y cultura local, estamos aquí para apoyarte en tu viaje
            hacia una vida más saludable, estés donde estés.
          </p>
          <motion.button
            className="bg-[#DA5F6F] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#C54E5E" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Agenda tu Consulta Internacional
          </motion.button>
        </div>
      </div>
    </section>
  );
}
