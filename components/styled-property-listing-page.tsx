"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Brain } from "lucide-react";

export default function StyledPropertyListingPageComponent() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingSteps = [
    "Picking-out key highlights about the area...",
    "Writing your bespoke property description...",
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setLoadingStep(0);

    const formData = new FormData(event.currentTarget);
    const type = formData.get("type");
    const location = formData.get("location");
    const propertyDesc = formData.get("description");
    const keyElements = formData.get("key-elements");

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingStep(1);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setDescription(`
      Welcome to this beautiful ${propertyDesc} located in the heart of ${location}.
      This stunning property has been lovingly maintained by its previous owners and is ready for you to move in and make it your own.

      Positioned on a quiet street and ${keyElements}, you are ideally located for easy access to the city centre.
      The area also offers a variety of shops, restaurants, and other amenities.

      The property itself has been lovingly maintained and still retains many of its original features.
      As you enter the house, you are welcomed by a bright and airy living room.
      
      This ${type} property is perfect for those looking for a comfortable and convenient home in ${location}.
    `);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <main>
          <h1 className="text-2xl font-bold mb-8 text-center">
            Property Listing Generator
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-[#1a2236] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Create Property Listing
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select name="type">
                    <SelectTrigger
                      id="type"
                      className="bg-[#2a3449] border-[#3a4459]"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Property location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Example: London, Hackney, Grazebrook Rd"
                    className="bg-[#2a3449] border-[#3a4459]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Describe the property</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Example: House, 4 bedrooms, equipped kitchen"
                    className="bg-[#2a3449] border-[#3a4459]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="key-elements">Key elements</Label>
                  <Textarea
                    id="key-elements"
                    name="key-elements"
                    placeholder="Example: Large garden, quiet, close to shops"
                    rows={3}
                    className="bg-[#2a3449] border-[#3a4459]"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Generating..." : "Generate Listing"}
                </Button>
              </form>
            </div>

            {/* Generated Description */}
            <div className="bg-[#1a2236] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Generated Description
              </h2>
              <div className="rounded-lg min-h-[200px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
                    <p className="text-center text-gray-400">
                      {loadingSteps[loadingStep]}
                    </p>
                  </div>
                ) : description ? (
                  <p className="whitespace-pre-line">{description}</p>
                ) : (
                  <p className="text-gray-400">
                    Your property description will appear here after you
                    generate the listing.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500">
          © 2024 AgentCoach.AI. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
