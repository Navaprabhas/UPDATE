
import { Squares } from "@/components/ui/squares-background";
import { SparklesText } from "@/components/ui/sparkles-text";
import { CircularTestimonialsDemo } from "@/components/ui/circular-testimonials-demo";
import { DefaultDemo } from "@/components/ui/expandable-tabs-demo";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060606]">
      {/* Animated squares background */}
      <div className="absolute inset-0">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
      
      {/* PRABHAS text in top-right corner */}
      <div className="absolute top-8 right-8 z-20">
        <SparklesText 
          text="PRABHAS" 
          className="text-lg font-bold text-white"
          sparklesCount={15}
          colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
        />
      </div>

      {/* Expandable tabs in top-left corner */}
      <div className="absolute top-8 left-8 z-20">
        <DefaultDemo />
      </div>

      {/* Centered CircularTestimonials - adjusted positioning to avoid overlap */}
      <div className="flex items-center justify-center min-h-screen z-10 relative pt-24 md:pt-16">
        <CircularTestimonialsDemo />
      </div>
    </div>
  );
};

export default Index;
