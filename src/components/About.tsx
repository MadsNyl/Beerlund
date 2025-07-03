
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Beer, Target, Zap } from "lucide-react";

const About = () => {
  const rules = [
    {
      icon: Clock,
      title: "4 Runder",
      description: "Løp 4 × 400m runder rundt en bane",
      color: "text-blue-600"
    },
    {
      icon: Beer,
      title: "4 Øl",
      description: "Dirkk en 0,33L øl før hver runde",
      color: "text-amber-600"
    },
    {
      icon: Target,
      title: "Ingen Oppkast",
      description: "Hold alt nede eller så får du en strafferunde",
      color: "text-red-600"
    },
    {
      icon: Zap,
      title: "Elite Tid",
      description: "Fullfør på under 6 minutter for å være med i eliten",
      color: "text-green-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Hva er en
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
              {" "}Beer Mile?
            </span>
          </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beer mile er et drikkeløp som kombinerer løping og hurtigdrikking.
            Det er en test av fysisk form, drikkeevne og mental styrke
            som har fått kultstatus over hele verden.
        </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rules.map((rule, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-4 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <rule.icon className={`h-8 w-8 ${rule.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{rule.title}</h3>
                <p className="text-gray-600 leading-relaxed">{rule.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Den Ultimate Utfordringen</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Født ut av et enkelt veddemål mellom løpere, har beer mile utviklet seg til en legitim sport med verdensrekorder, mesterskap og et dedikert miljø av utøvere som utfordrer grensene for hva som er mulig når man kombinerer kondisjon med alkoholkonsum.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <h4 className="text-2xl font-bold text-amber-600 mb-2">Verdensrekord</h4>
                <p className="text-3xl font-bold text-gray-900">4:33.6</p>
                <p className="text-gray-600">Corey Bellemore</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-orange-600 mb-2">Elite Tid</h4>
                <p className="text-3xl font-bold text-gray-900">Under 6:00</p>
                <p className="text-gray-600">Den Gyldne Standard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;