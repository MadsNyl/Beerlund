import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Filter } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

const EventsPage = () => {
  const [filter, setFilter] = useState<boolean>(false);

  const { data, isLoading, error } = useEvents(1, 20, filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Beer Mile
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                {" "}
                Arrangementer
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Finn og meld deg på beer mile løp i hele Norge. Fra lokale
              arrangementer til nasjonale mesterskap.
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
              <ToggleGroup
                type="single"
                // 3) ToggleGroup expects a string value, so serialize:
                value={String(filter)}
                onValueChange={(val) => {
                  if (val === "true") setFilter(true);
                  else if (val === "false") setFilter(false);
                }}
              >
                <ToggleGroupItem
                  value="false"
                  className="px-6 py-3 rounded-xl font-medium"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Kommende Løp
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="true"
                  className="px-6 py-3 rounded-xl font-medium"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Avsluttede Løp
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && new Array(6).fill(null).map((_, index) => (
              <Skeleton
                key={index}
                className="h-96 rounded-2xl shadow-lg"
              />
            ))}

            {data && data.events.length > 0 && data.events.map((event) => (
              <div key={event.id} className="group">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <Badge>Åpent for påmelding</Badge>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                      {event.name}
                    </h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <div className="bg-amber-100 p-2 rounded-lg mr-3">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="font-medium">
                          {new Date(event.start_time).toLocaleDateString(
                            "no-NO",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className="bg-orange-100 p-2 rounded-lg mr-3">
                          <Clock className="h-4 w-4 text-orange-600" />
                        </div>
                        <span className="font-medium">
                          {new Date(event.start_time).toLocaleTimeString(
                            "no-NO",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <MapPin className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="font-medium">
                          {event.address}, {event.country}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <Users className="h-4 w-4 text-red-600" />
                        </div>
                        <span className="font-medium">
                          {event.participants}/{event.max_participants} deltakere
                        </span>
                      </div>
                    </div>

                    <Link to={`/events/${event.id}`}>
                      <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl py-3 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Les mer
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isLoading && data && data.events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Ingen arrangementer funnet for valgt filter.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
