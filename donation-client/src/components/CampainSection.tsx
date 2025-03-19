import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Filter,
  Globe,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

// Import our custom animation hooks and components

import { useRotatingThemes, useScrollAnimation } from "@/hooks/use-animation";
import {
  fadeInUp,
  progressBar,
  staggerContainer,
} from "@/utils/animation-variations";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatedButton,
  FadeInElement,
  FloatingShape,
  PulsingElement,
} from "./AnimatedElement";

// Define our color themes
const colorThemes = [
  { primary: "#FF5757", secondary: "#FFBD59", accent: "#4CB9E7" },
  { primary: "#8E6FFF", secondary: "#5CFFB1", accent: "#FF6FD7" },
  { primary: "#FF8C42", secondary: "#4DEEEA", accent: "#B15DFF" },
];

export default function CampaignSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Use our custom hooks
  const currentTheme = useRotatingThemes(colorThemes);

  // Ref for scroll animations
  const sectionRef = useRef(null);
  const { controls } = useScrollAnimation(sectionRef, false, "-100px");

  // Campaign categories
  const categories = [
    { id: "all", label: "All Campaigns" },
    { id: "education", label: "Education" },
    { id: "healthcare", label: "Healthcare" },
    { id: "environment", label: "Environment" },
    { id: "community", label: "Community" },
  ];

  // Featured campaign data
  const featuredCampaign = {
    id: 1,
    title: "Clean Water Initiative for Rural Communities",
    description:
      "Help us bring clean drinking water to 50 villages facing severe water scarcity. Your donation will fund well construction and water purification systems.",
    category: "community",
    raised: 28500,
    goal: 50000,
    daysLeft: 18,
    supporters: 342,
    image: "/placeholder.svg?height=600&width=800&text=Clean+Water+Initiative",
  };

  // Campaign cards data
  const campaigns = [
    {
      id: 2,
      title: "Education for Underprivileged Children",
      description:
        "Support education for 200 children without access to schools. Provide books, uniforms, and school supplies.",
      category: "education",
      raised: 12800,
      goal: 20000,
      daysLeft: 24,
      supporters: 186,
      image: "/placeholder.svg?height=400&width=600&text=Education",
    },
    {
      id: 3,
      title: "Emergency Medical Relief Fund",
      description:
        "Provide critical medical supplies and support to communities affected by recent natural disasters.",
      category: "healthcare",
      raised: 35200,
      goal: 40000,
      daysLeft: 12,
      supporters: 415,
      image: "/placeholder.svg?height=400&width=600&text=Medical+Relief",
    },
    {
      id: 4,
      title: "Reforestation Project",
      description:
        "Help us plant 10,000 trees to combat deforestation and restore natural habitats for wildlife.",
      category: "environment",
      raised: 18600,
      goal: 30000,
      daysLeft: 30,
      supporters: 278,
      image: "/placeholder.svg?height=400&width=600&text=Reforestation",
    },
    {
      id: 5,
      title: "Community Center Renovation",
      description:
        "Renovate the local community center to provide a safe space for youth programs and community gatherings.",
      category: "community",
      raised: 15400,
      goal: 25000,
      daysLeft: 21,
      supporters: 203,
      image: "/placeholder.svg?height=400&width=600&text=Community+Center",
    },
    {
      id: 6,
      title: "Scholarship Fund for Girls",
      description:
        "Provide scholarships for girls from low-income families to pursue higher education and career opportunities.",
      category: "education",
      raised: 22300,
      goal: 35000,
      daysLeft: 15,
      supporters: 267,
      image: "/placeholder.svg?height=400&width=600&text=Scholarships",
    },
    {
      id: 7,
      title: "Sustainable Farming Initiative",
      description:
        "Support local farmers in adopting sustainable farming practices to protect the environment and improve crop yields.",
      category: "environment",
      raised: 14700,
      goal: 28000,
      daysLeft: 27,
      supporters: 192,
      image: "/placeholder.svg?height=400&width=600&text=Sustainable+Farming",
    },
  ];

  // Filter campaigns by category
  const filteredCampaigns =
    activeCategory === "all"
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}05 0%, ${currentTheme.secondary}10 50%, ${currentTheme.accent}05 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colorful floating shapes */}
        {[...Array(8)].map((_, i) => (
          <FloatingShape
            key={i}
            color={
              [
                currentTheme.primary,
                currentTheme.secondary,
                currentTheme.accent,
              ][i % 3] + "50"
            }
            size={Math.random() * 200 + 100}
            delay={Math.random() * 5}
            duration={Math.random() * 15 + 15}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
        >
          <FadeInElement
            delay={0.2}
            direction="none"
            className="inline-flex items-center rounded-full px-3 py-1 text-sm mb-4"
            style={{
              backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
              color: currentTheme.primary,
              border: `1px solid ${currentTheme.primary}30`,
            }}
          >
            <Sparkles
              className="mr-1 h-3.5 w-3.5"
              style={{ color: currentTheme.primary }}
            />
            <span>Make an Impact</span>
          </FadeInElement>

          <FadeInElement delay={0.3}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Current Campaigns
            </h2>
          </FadeInElement>

          <FadeInElement delay={0.4}>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our active campaigns and find a cause that resonates with
              you. Every donation, no matter the size, makes a difference in
              someone's life.
            </p>
          </FadeInElement>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: 0.5,
              },
            },
          }}
        >
          {categories.map((category, index) => (
            <FadeInElement key={category.id} delay={0.5 + index * 0.1}>
              <AnimatedButton>
                <Button
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="rounded-full relative overflow-hidden"
                  style={{
                    backgroundColor:
                      activeCategory === category.id
                        ? currentTheme.primary
                        : "transparent",
                    borderColor: currentTheme.primary + "40",
                  }}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="selectedCategory"
                      className="absolute inset-0"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2 }}
                      style={{ backgroundColor: currentTheme.primary }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {category.id === "all" ? (
                      <Filter className="h-3.5 w-3.5 mr-1" />
                    ) : category.id === "education" ? (
                      <span className="mr-1">🎓</span>
                    ) : category.id === "healthcare" ? (
                      <span className="mr-1">🏥</span>
                    ) : category.id === "environment" ? (
                      <span className="mr-1">🌱</span>
                    ) : (
                      <span className="mr-1">🏘️</span>
                    )}
                    {category.label}
                  </span>
                </Button>
              </AnimatedButton>
            </FadeInElement>
          ))}
        </motion.div>

        {/* Featured campaign */}
        <FadeInElement
          delay={0.6}
          direction="up"
          distance={40}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured campaign image */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  {/* <Image
                    src={featuredCampaign.image || "/placeholder.svg"}
                    alt={featuredCampaign.title}
                    fill
                    className="object-cover"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </motion.div>

                {/* Featured badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge
                    className="px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                      border: "none",
                    }}
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1" /> Featured Campaign
                  </Badge>
                </div>

                {/* Category badge */}
                <div className="absolute bottom-4 left-4 z-10">
                  <Badge
                    variant="outline"
                    className="bg-black/30 backdrop-blur-sm border-white/20 text-white"
                  >
                    {featuredCampaign.category === "education"
                      ? "🎓 Education"
                      : featuredCampaign.category === "healthcare"
                      ? "🏥 Healthcare"
                      : featuredCampaign.category === "environment"
                      ? "🌱 Environment"
                      : "🏘️ Community"}
                  </Badge>
                </div>
              </div>

              {/* Featured campaign content */}
              <div className="p-6 md:p-8 flex flex-col">
                <h3 className="text-2xl font-bold mb-3">
                  {featuredCampaign.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {featuredCampaign.description}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">
                      ${featuredCampaign.raised.toLocaleString()} raised
                    </span>
                    <span className="text-muted-foreground">
                      of ${featuredCampaign.goal.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (featuredCampaign.raised / featuredCampaign.goal) *
                          100
                        }%`,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                      }}
                    />
                  </div>
                </div>

                {/* Campaign stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-full"
                      style={{ backgroundColor: currentTheme.primary + "15" }}
                    >
                      <Clock
                        className="h-4 w-4"
                        style={{ color: currentTheme.primary }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days Left</p>
                      <p className="font-medium">
                        {featuredCampaign.daysLeft} days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-full"
                      style={{ backgroundColor: currentTheme.secondary + "15" }}
                    >
                      <Users
                        className="h-4 w-4"
                        style={{ color: currentTheme.secondary }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Supporters
                      </p>
                      <p className="font-medium">
                        {featuredCampaign.supporters}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 mt-auto">
                  <AnimatedButton className="flex-1">
                    <Button
                      className="w-full relative overflow-hidden"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                        boxShadow: `0 4px 14px ${currentTheme.primary}30`,
                      }}
                    >
                      <PulsingElement className="mr-1">
                        <Heart className="h-4 w-4" />
                      </PulsingElement>
                      Donate Now
                    </Button>
                  </AnimatedButton>

                  <AnimatedButton>
                    <Button variant="outline" className="border-primary/30">
                      Learn More
                    </Button>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </FadeInElement>

        {/* Campaign cards grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <AnimatePresence mode="wait">
            {filteredCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                variants={fadeInUp}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                layout
                className="group"
                onHoverStart={() => setHoveredCard(campaign.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <div className="h-full rounded-xl border bg-card overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg relative">
                  {/* Card image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      animate={{
                        scale: hoveredCard === campaign.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                      /> */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>

                    {/* Category badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <Badge
                        variant="outline"
                        className="bg-black/30 backdrop-blur-sm border-white/20 text-white"
                      >
                        {campaign.category === "education"
                          ? "🎓 Education"
                          : campaign.category === "healthcare"
                          ? "🏥 Healthcare"
                          : campaign.category === "environment"
                          ? "🌱 Environment"
                          : "🏘️ Community"}
                      </Badge>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">
                      {campaign.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Progress bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">
                          ${campaign.raised.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          of ${campaign.goal.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          variants={progressBar(
                            (campaign.raised / campaign.goal) * 100
                          )}
                          initial="initial"
                          animate="animate"
                          className="h-full rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Campaign stats */}
                    <div className="flex justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{campaign.supporters} supporters</span>
                      </div>
                    </div>

                    {/* Action button */}
                    <AnimatedButton>
                      <Link to={`#campaign-${campaign.id}`}>
                        <Button
                          variant="outline"
                          className="w-full group-hover:border-primary/50 transition-colors"
                        >
                          <span>Support This Cause</span>
                          <motion.div
                            animate={{
                              x: hoveredCard === campaign.id ? 5 : 0,
                              opacity: hoveredCard === campaign.id ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="ml-1"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </Link>
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all campaigns button */}
        <FadeInElement delay={1.2} className="mt-10 text-center">
          <AnimatedButton className="inline-block">
            <Button variant="outline" size="lg" className="rounded-full group">
              <span>View All Campaigns</span>
              <motion.div className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                <ChevronRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </AnimatedButton>
        </FadeInElement>

        {/* Impact statistics */}
        <motion.div
          className="mt-20 pt-10 border-t"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          <div className="text-center mb-10">
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold mb-2">
              Our Impact Together
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-muted-foreground">
              Through your generous support, we've made a real difference in
              communities worldwide.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <ImpactStat
              icon={<Users className="h-5 w-5" />}
              value="250K+"
              label="Lives Impacted"
              color={currentTheme.primary}
            />
            <ImpactStat
              icon={<Globe className="h-5 w-5" />}
              value="45"
              label="Countries Reached"
              color={currentTheme.secondary}
            />
            <ImpactStat
              icon={<Calendar className="h-5 w-5" />}
              value="15"
              label="Years of Service"
              color={currentTheme.accent}
            />
            <ImpactStat
              icon={<Heart className="h-5 w-5" />}
              value="$8.5M"
              label="Funds Raised"
              color={currentTheme.primary}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ImpactStatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

function ImpactStat({ icon, value, label, color }: ImpactStatProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="text-center"
    >
      <motion.div
        className="mx-auto mb-3 flex items-center justify-center rounded-full w-14 h-14 relative"
        animate={{
          boxShadow: isHovered
            ? `0 0 0 8px ${color}10`
            : `0 0 0 0px ${color}10`,
        }}
        transition={{ duration: 0.3 }}
        style={{ backgroundColor: color + "15" }}
      >
        <div style={{ color }}>{icon}</div>

        {/* Animated rings on hover */}
        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${color}40` }}
              />
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 0, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="absolute inset-0 rounded-full"
                style={{ border: `1px solid ${color}40` }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="text-2xl font-bold"
        animate={{
          color: isHovered ? color : "#000000",
        }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
