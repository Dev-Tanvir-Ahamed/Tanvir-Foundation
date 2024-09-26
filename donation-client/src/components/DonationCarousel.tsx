import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import donationFood from "../assets/images/CaroselImage/foodDonation.jpg"
import clothDonation from "../assets/images/CaroselImage/clothDonation.jpg"
import educationalKits from "../assets/images/CaroselImage/educationalKits.jpg"
import medicineSupplies from "../assets/images/CaroselImage/medicalSupplies.jpg"
import shelterSupport from "../assets/images/CaroselImage/ShelterSupport.jpg"
// Mock data for demonstration
const donationData = [
  {
    id: 1,
    imageUrl: donationFood,
    title: "Food Donation",
    description: "Providing meals to the affected families.",
  },
  {
    id: 2,
    imageUrl: clothDonation,
    title: "Clothing Donation",
    description: "Warm clothes for those in need.",
  },
  {
    id: 3,
    imageUrl: medicineSupplies,
    title: "Medical Supplies",
    description: "Essential medical supplies for disaster victims.",
  },
  {
    id: 4,
    imageUrl: shelterSupport,
    title: "Shelter Support",
    description: "Temporary shelters for displaced families.",
  },
  {
    id: 5,
    imageUrl: educationalKits,
    title: "Educational Kits",
    description: "School supplies for children affected by the disaster.",
  },
];


export const DonationCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <Carousel className="w-full max-w-6xl mx-auto"
    plugins={[plugin.current]}
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {donationData.map((donation) => (
          <CarouselItem key={donation.id}>
            <div className="p-2">
              {/* <Card className="overflow-hidden rounded-lg shadow-lg"> */}
                <CardContent className="flex flex-col items-center p-4">
                  <img 
                    src={donation.imageUrl} 
                    alt={donation.title} 
                    className="w-full h-[500px] object-cover mb-4 rounded-md"
                  />
                  <h2 className="text-lg font-semibold">{donation.title}</h2>
                  <p className="text-sm text-gray-600">{donation.description}</p>
                </CardContent>
              {/* </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 focus:ring-green-500" />
      <CarouselNext className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 focus:ring-green-500" /> */}
    </Carousel>
  )
}
