import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CTAData {
  title: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; href: string };
  badge?: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const CTASection = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  badge = "[ READY TO START ]",
}: CTAData) => {
  return (
    <section className="my-6 sm:my-10 lg:my-20 px-6 sm:px-8 lg:px-8">
      <Card
        className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8 py-8 sm:py-12 lg:py-16 text-center rounded-3xl"
      >
        <motion.p
          variants={fadeUp}
          className="font-bold text-[10px] lg:text-xs text-muted-foreground tracking-[0.25em] uppercase mb-2 sm:mb-4 lg:mb-5"
        >
          {badge}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground lg:text-5xl max-w-3xl mx-auto leading-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-3 sm:mt-4 lg:mt-5 max-w-2xl mx-auto text-sm lg:text-base text-muted-foreground font-semibold leading-6 lg:leading-7"
        >
          {description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-6 sm:mt-8 lg:mt-9 flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <Link to={primaryButton.href}>
            <Button className="bg-orange-500 hover:bg-primary text-white h-11 px-8 rounded-lg font-medium">
              {primaryButton.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to={secondaryButton.href}>
            <Button
              variant="ghost"
              className="h-11 px-8 rounded-lg border border-border text-foreground hover:bg-card"
            >
              {secondaryButton.label}
            </Button>
          </Link>
        </motion.div>
      </Card>
    </section>
  );
};

export default CTASection;