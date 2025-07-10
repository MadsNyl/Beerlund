import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Trophy, Medal, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEvent } from "@/hooks/useEvent";
import { useJoinEvent } from "@/hooks/useJoinEvent";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { useLeaveEvent } from "@/hooks/useLeaveEvent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { LeaderboardEntry, Participant } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDuration } from "@/lib/utils";

const EventDetails = () => {
  const { id } = useParams();
  const { userId } = useAuth();

  const { data, isLoading, error } = useEvent(id ? parseInt(id) : undefined);
  const join = useJoinEvent(id ? parseInt(id) : undefined);
  const leave = useLeaveEvent(id ? parseInt(id) : undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <p className="text-gray-500 text-lg">Laster arrangement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <p className="text-red-500 text-lg">Feil ved lasting av arrangement: {error.message}</p>
        </div>
        <Footer />
      </div>
    );
  }

  const event = data;

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <p className="text-gray-500 text-lg">Arrangement ikke funnet.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isParticipant = userId && event.participants.some(participant => participant.user_id === userId);

  // Simple markdown-like parsing
  const parseMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-6">{line.substring(3)}</h2>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="text-gray-600 mb-2 ml-4">{line.substring(2)}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="text-gray-600 mb-4 leading-relaxed">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      
      <main>
        {/* Hero Section with Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img 
            src={event.image_url} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <Badge className="bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg">
                  Åpent for påmelding
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {event.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
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
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
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
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">
                    {event.address}, {event.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="font-medium">{event.participants.length}/{event.max_participants} deltakere</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <div className="prose prose-lg max-w-none">
                  {parseMarkdown(event.description)}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Registration Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Påmelding
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      {event.participants.length}/{event.max_participants}
                    </div>
                    <p className="text-gray-600">påmeldte deltakere</p>
                  </div>
                  {!userId
                   ? (
                    <SignInButton>
                      <Button
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Logg inn for å melde deg på
                      </Button>
                    </SignInButton>
                   )
                  : isParticipant
                    ? (
                      <Button
                       className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                       onClick={() => leave.mutate()}
                       disabled={leave.isPending}
                      >
                        {
                          leave.isPending
                            ? <span>Meldes av...</span> 
                            : <span>Meld deg av</span>
                        }
                      </Button>
                    )
                    : (
                      <Button
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => join.mutate()}
                        disabled={event.participants.length >= event.max_participants || join.isPending}
                      >
                        {
                          join.isPending
                            ? <span>Melder deg på...</span>
                            : <span>Meld deg på</span>
                        }
                      </Button>
                    )
                  }
                  <p className="text-sm text-gray-500 text-center">
                    Bindende påmelding.
                  </p>
                </CardContent>
                </Card>

              {/* Event Info Card */}
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Arrangementinfo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(event.start_time).toLocaleDateString(
                          "no-NO",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-gray-600">Dato</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(event.start_time).toLocaleTimeString("no-NO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">Starttid</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {event.address}, {event.city}
                      </p>
                      <p className="text-sm text-gray-600">Lokasjon</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full border-2 border-amber-600 text-amber-700 hover:bg-amber-50 font-semibold py-3 rounded-xl transition-all duration-300">
                          <Users className="h-4 w-4 mr-2" />
                          Se alle deltakere
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[70vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-gray-900">
                            Deltakere - {event.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-6">
                          <p className="text-gray-600 mb-4">
                            {event.participants.length || 0} påmeldte deltakere
                          </p>
                          <div className="space-y-2">
                            {event.participants.map((participant: Participant, index: number) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                                <div>
                                  <p className="font-semibold text-gray-900">{participant.user.first_name} {participant.user.last_name}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">
                                    Påmeldt: {new Date(participant.created_at).toLocaleDateString('nb-NO')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          {event.leaderboard.length > 0 && (
            <div className="mt-16">
              <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <Trophy className="h-8 w-8 text-amber-600" />
                    Resultater - Topp 3
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Plass</TableHead>
                        <TableHead>Navn</TableHead>
                        <TableHead>Tid</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {event.leaderboard.map((result: LeaderboardEntry, index: number) => (
                        <TableRow key={index} className="hover:bg-amber-50/50">
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              {result.rank === 1 && <Trophy className="h-6 w-6 text-amber-500 mr-2" />}
                              {result.rank === 2 && <Medal className="h-6 w-6 text-gray-400 mr-2" />}
                              {result.rank === 3 && <Award className="h-6 w-6 text-amber-600 mr-2" />}
                              <span className="font-bold text-lg">{result.rank}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">{result.user.first_name} {result.user.last_name}</TableCell>
                          <TableCell className="font-mono text-lg font-bold text-amber-600">
                            {formatDuration(result.score)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventDetails;