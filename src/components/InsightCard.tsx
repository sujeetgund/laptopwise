import type { FC, ReactNode } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface InsightCardProps {
  title: string;
  description: string;
  children?: ReactNode; // For potential charts or more complex content
  imageUrl?: string;
  imageAlt?: string;
  dataAiHint?: string;
  animationDelay?: string;
}

const InsightCard: FC<InsightCardProps> = ({
  title,
  description,
  children,
  imageUrl,
  imageAlt,
  dataAiHint,
  animationDelay = "0s",
}) => {
  return (
    <Card
      className="bg-card/50 backdrop-blur-sm shadow-xl border-border/30 hover:shadow-primary/20 transition-shadow duration-300 h-full flex flex-col animate-fadeInUp"
      style={{ animationDelay }}
    >
      {imageUrl && (
        <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
            {...(dataAiHint && { "data-ai-hint": dataAiHint })}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-foreground/80 mb-4">
          {description}
        </CardDescription>
        {children}
      </CardContent>
    </Card>
  );
};

export default InsightCard;
