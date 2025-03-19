import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Globe, Heart, Sparkles, Star, Users } from "lucide-react";
import { useRef } from "react";

// Import our custom animation hooks and components

import {
  useCounter,
  useParallax,
  useRotatingThemes,
  useScrollAnimation,
} from "@/hooks/use-animation";
import { fadeInUp, staggerContainer } from "@/utils/animation-variations";
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

export default function DonationHero() {
  const [donationAmount, setDonationAmount] = useState<number | "">("");
  const [isHovered, setIsHovered] = useState(false);

  // Use our custom hooks
  const currentTheme = useRotatingThemes(colorThemes);
  const parallaxOffset = useParallax(0.2);
  const negativeParallaxOffset = useParallax(-0.1);

  const statsRef = useRef(null);
  const { controls: statsControls } = useScrollAnimation(
    statsRef,
    true,
    "-100px"
  );

  const presetAmounts = [10, 25, 50, 100];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 min-h-[90vh] flex items-center"
      style={{
        backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}10 0%, ${currentTheme.secondary}20 50%, ${currentTheme.accent}15 100%)`,
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colorful floating shapes */}
        {[...Array(15)].map((_, i) => (
          <FloatingShape
            key={i}
            color={
              [
                currentTheme.primary,
                currentTheme.secondary,
                currentTheme.accent,
              ][i % 3] + "80"
            }
            size={Math.random() * 150 + 50}
            delay={Math.random() * 5}
            duration={Math.random() * 15 + 10}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5" />
      </div>

      {/* Parallax images */}
      <motion.div
        className="absolute right-[-10%] top-[5%] w-[300px] h-[300px] rounded-full opacity-60 hidden md:block"
        style={{
          y: parallaxOffset,
          backgroundImage: `radial-gradient(circle at center, ${currentTheme.primary}40, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <motion.div
        className="absolute left-[-5%] bottom-[10%] w-[250px] h-[250px] rounded-full opacity-50 hidden md:block"
        style={{
          y: negativeParallaxOffset,
          backgroundImage: `radial-gradient(circle at center, ${currentTheme.secondary}40, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col space-y-6">
            <FadeInElement delay={0.2} direction="none">
              <div
                className="inline-flex items-center rounded-full px-3 py-1 text-sm"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}30, ${currentTheme.secondary}30)`,
                  color: currentTheme.primary,
                  border: `1px solid ${currentTheme.primary}30`,
                }}
              >
                <Sparkles
                  className="mr-1 h-3.5 w-3.5"
                  style={{ color: currentTheme.primary }}
                />
                <span>Together we can make a difference</span>
              </div>
            </FadeInElement>

            <FadeInElement delay={0.3}>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Help us create a{" "}
                <span className="relative">
                  <span
                    className="relative z-10"
                    style={{ color: currentTheme.primary }}
                  >
                    better world
                  </span>
                  <motion.svg
                    viewBox="0 0 300 20"
                    className="absolute bottom-0 left-0 z-0 w-full"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                  >
                    <motion.path
                      d="M 0 10 C 50 30, 100 -10, 150 10 C 200 30, 250 -10, 300 10"
                      fill="none"
                      stroke={currentTheme.secondary}
                      strokeWidth="3"
                    />
                  </motion.svg>
                </span>
              </h1>
            </FadeInElement>

            <FadeInElement delay={0.4}>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Your donation helps us provide essential resources to
                communities in need. Join thousands of supporters making real
                change happen every day.
              </p>
            </FadeInElement>

            <FadeInElement delay={0.5}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users
                  className="h-5 w-5"
                  style={{ color: currentTheme.primary }}
                />
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  <span className="font-bold">12,458</span> people have donated
                  this month
                </motion.span>
              </div>
            </FadeInElement>

            {/* Animated image gallery */}
            {/* which type of image i used here */}
            <FadeInElement delay={0.7}>
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((img, index) => (
                  <motion.div
                    key={index}
                    className="relative overflow-hidden rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                  >
                    {/* <Image
                      src={`/placeholder.svg?height=100&width=100&text=Impact+${img}`}
                      width={80}
                      height={80}
                      alt={`Impact image ${img}`}
                      className="object-cover rounded-lg border-2"
                      style={{
                        borderColor:
                          index === 0
                            ? currentTheme.primary
                            : index === 1
                              ? currentTheme.secondary
                              : currentTheme.accent,
                      }}
                    /> */}
                  </motion.div>
                ))}
              </div>
            </FadeInElement>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="rounded-2xl border bg-card/80 backdrop-blur-md p-6 shadow-lg md:p-8 relative overflow-hidden"
            style={{
              boxShadow: `0 10px 30px -5px ${currentTheme.primary}30`,
              border: `1px solid ${currentTheme.primary}20`,
            }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${currentTheme.secondary}, transparent 70%)`,
                filter: "blur(40px)",
                transform: "translate(20%, -20%)",
              }}
            />

            <div className="space-y-6 relative z-10">
              <div className="space-y-2 text-center">
                <FadeInElement
                  direction="down"
                  delay={0.7}
                  className="flex justify-center mb-2"
                >
                  <PulsingElement
                    className="rounded-full p-3"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${currentTheme.primary}20, ${currentTheme.secondary}20)`,
                    }}
                  >
                    <Heart
                      className="h-6 w-6"
                      style={{ color: currentTheme.primary }}
                    />
                  </PulsingElement>
                </FadeInElement>

                <h2 className="text-2xl font-bold">Make a Donation</h2>
                <p className="text-muted-foreground">
                  Your support makes our work possible
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {presetAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        donationAmount === amount ? "default" : "outline"
                      }
                      onClick={() => setDonationAmount(amount)}
                      className="transition-all relative overflow-hidden"
                      style={{
                        backgroundColor:
                          donationAmount === amount
                            ? currentTheme.primary
                            : "transparent",
                        borderColor: currentTheme.primary + "40",
                      }}
                    >
                      {donationAmount === amount && (
                        <motion.div
                          layoutId="selectedAmount"
                          className="absolute inset-0"
                          initial={false}
                          transition={{ type: "spring", bounce: 0.2 }}
                          style={{ backgroundColor: currentTheme.primary }}
                        />
                      )}
                      <span className="relative z-10">${amount}</span>
                    </Button>
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground">$</span>
                  </div>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={donationAmount}
                    onChange={(e) =>
                      setDonationAmount(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="pl-7"
                    min={1}
                    style={{ borderColor: currentTheme.primary + "40" }}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className="relative"
                >
                  <Link to="#donate-now">
                    <Button
                      className="relative w-full h-12 overflow-hidden group"
                      size="lg"
                      style={{
                        backgroundColor: currentTheme.primary,
                        boxShadow: `0 4px 14px ${currentTheme.primary}40`,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={{ x: "-100%" }}
                        animate={{ x: isHovered ? "0%" : "-100%" }}
                        transition={{ duration: 0.4 }}
                        style={{
                          backgroundColor: currentTheme.secondary + "30",
                        }}
                      />

                      <motion.div
                        className="flex items-center justify-center gap-2 relative z-10"
                        animate={{ x: isHovered ? -5 : 0 }}
                      >
                        <Heart className="h-5 w-5" />
                        <span>Donate Now</span>
                        <motion.div
                          animate={{
                            x: isHovered ? 5 : 0,
                            opacity: isHovered ? 1 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </motion.div>
                    </Button>
                  </Link>

                  {/* Animated hearts on button hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-primary-foreground"
                            initial={{
                              y: 0,
                              x: "50%",
                              opacity: 0.9,
                              scale: 0.5,
                            }}
                            animate={{
                              y: -80 - i * 15,
                              x: `calc(50% + ${(i - 3.5) * 25}px)`,
                              opacity: 0,
                              scale: 0.8,
                              rotate: i % 2 === 0 ? 15 : -15,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 1 + i * 0.1,
                              ease: "easeOut",
                            }}
                          >
                            {i % 3 === 0 ? (
                              <Star
                                className="h-4 w-4 fill-current"
                                style={{ color: currentTheme.secondary }}
                              />
                            ) : (
                              <Heart
                                className="h-4 w-4 fill-current"
                                style={{
                                  color:
                                    i % 2 === 0
                                      ? currentTheme.primary
                                      : currentTheme.accent,
                                }}
                              />
                            )}
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="flex items-center justify-center space-x-2">
                {/* <Image
                  src="/placeholder.svg?height=24&width=38&text=Visa"
                  width={38}
                  height={24}
                  alt="Visa"
                  className="h-6 w-auto"
                />
                <Image
                  src="/placeholder.svg?height=24&width=38&text=MC"
                  width={38}
                  height={24}
                  alt="Mastercard"
                  className="h-6 w-auto"
                />
                <Image
                  src="/placeholder.svg?height=24&width=38&text=PayPal"
                  width={38}
                  height={24}
                  alt="PayPal"
                  className="h-6 w-auto"
                /> */}
                <span className="text-xs text-muted-foreground">
                  Secure payment
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Impact counter with image background */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={staggerContainer}
        className="container relative z-10 mt-16"
      >
        <div
          className="mx-auto max-w-4xl rounded-xl border p-6 shadow-md relative overflow-hidden"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            borderColor: `${currentTheme.primary}30`,
          }}
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0 opacity-15">
            {/* <Image
              src="/placeholder.svg?height=300&width=1000&text=Impact"
              fill
              alt="Impact background"
              className="object-cover"
            /> */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${currentTheme.primary}80, ${currentTheme.secondary}80)`,
                mixBlendMode: "color",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 relative z-10">
            <CounterItem
              value={120}
              label="Projects Funded"
              icon={<Globe className="h-5 w-5" />}
              color={currentTheme.primary}
            />
            <CounterItem
              value={45}
              label="Countries Reached"
              icon={<Globe className="h-5 w-5" />}
              color={currentTheme.secondary}
            />
            <CounterItem
              value={8500}
              label="Lives Impacted"
              icon={<Users className="h-5 w-5" />}
              color={currentTheme.accent}
            />
            <CounterItem
              value={2.4}
              label="Million $ Raised"
              icon={<Heart className="h-5 w-5" />}
              color={currentTheme.primary}
            />
          </div>
        </div>
      </motion.div>

      {/* Floating donation reminder */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8"
      >
        <AnimatedButton
          className="flex items-center gap-2 rounded-full px-4 py-2 shadow-lg cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(90deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
            boxShadow: `0 4px 20px ${currentTheme.primary}50`,
          }}
        >
          <PulsingElement>
            <Heart className="h-5 w-5 text-white" />
          </PulsingElement>
          <span className="text-white font-medium">Donate Now</span>
        </AnimatedButton>
      </motion.div>
    </section>
  );
}

interface CounterItemProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

function CounterItem({ value, label, icon, color }: CounterItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const count = useCounter(value);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="text-center"
    >
      <motion.div
        className="mx-auto mb-2 flex items-center justify-center rounded-full w-10 h-10"
        whileHover={{ scale: 1.1, rotate: 5 }}
        style={{ backgroundColor: color + "20" }}
      >
        <div style={{ color }}>{icon}</div>
      </motion.div>
      <motion.div
        className="text-2xl font-bold md:text-3xl"
        animate={{
          color: isHovered ? color : "#000000",
        }}
        transition={{ duration: 0.3 }}
      >
        {count.toLocaleString()}
        {label.includes("Million") && "M"}
      </motion.div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
