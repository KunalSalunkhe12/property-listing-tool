"use client";

import { useState, FormEvent } from "react";
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

interface description {
  title: string;
  mainDescription: string;
  propertyHighlights: string;
  additionalFeatures: string;
  locationAdvantages: string;
  conclusion: string;
}

export default function StyledPropertyListingPageComponent() {
  const [description, setDescription] = useState<description>({
    title: "",
    mainDescription: "",
    propertyHighlights: "",
    additionalFeatures: "",
    locationAdvantages: "",
    conclusion: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    location: "",
    propertyDesc: "",
    keyElements: "",
  });
  const [errors, setErrors] = useState({
    type: "",
    location: "",
    propertyDesc: "",
    keyElements: "",
  });

  const loadingSteps = [
    "Picking-out key highlights about the area...",
    "Writing your bespoke property description...",
  ];

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      type: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.type) {
      newErrors.type = "Please select a property type";
      isValid = false;
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }
    if (!formData.propertyDesc.trim()) {
      newErrors.propertyDesc = "Property description is required";
      isValid = false;
    }
    if (!formData.keyElements.trim()) {
      newErrors.keyElements = "Key elements are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingStep(0);

    const data = {
      listingType: formData.type,
      location: formData.location,
      propertyDetails: formData.propertyDesc,
      keySellingPoints: formData.keyElements,
    };

    try {
      const response = await fetch(
        "https://property-listing-ritesh.vercel.app/generate-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate description");
      }
      setLoadingStep(1);
      const result = await response.json();

      setDescription(result.description);
    } catch (error) {
      console.error("Error generating description:", error);
      setError(
        "An error occurred while generating the description. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <main>
          <h1 className="text-3xl font-bold mb-8 text-center">
            Property Listing Generator
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-[#1a2236] p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">
                Create Property Listing
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    name="type"
                    onValueChange={handleSelectChange}
                    value={formData.type}
                  >
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
                  {errors.type && (
                    <p className="text-red-500 text-sm" role="alert">
                      {errors.type}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Property location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Example: London, Hackney, Grazebrook Rd"
                    className="bg-[#2a3449] border-[#3a4459]"
                    aria-invalid={errors.location ? "true" : "false"}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm" role="alert">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="propertyDesc">Describe the property</Label>
                  <Input
                    id="propertyDesc"
                    name="propertyDesc"
                    value={formData.propertyDesc}
                    onChange={handleInputChange}
                    placeholder="Example: House, 4 bedrooms, equipped kitchen"
                    className="bg-[#2a3449] border-[#3a4459]"
                    aria-invalid={errors.propertyDesc ? "true" : "false"}
                  />
                  {errors.propertyDesc && (
                    <p className="text-red-500 text-sm" role="alert">
                      {errors.propertyDesc}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keyElements">Key elements</Label>
                  <Textarea
                    id="keyElements"
                    name="keyElements"
                    value={formData.keyElements}
                    onChange={handleInputChange}
                    placeholder="Example: Large garden, quiet, close to shops"
                    rows={3}
                    className="bg-[#2a3449] border-[#3a4459]"
                    aria-invalid={errors.keyElements ? "true" : "false"}
                  />
                  {errors.keyElements && (
                    <p className="text-red-500 text-sm" role="alert">
                      {errors.keyElements}
                    </p>
                  )}
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
              <h2 className="text-2xl font-semibold mb-4">
                Generated Description
              </h2>
              <div
                className="bg-[#2a3449] p-4 rounded-lg overflow-y-auto h-[26rem] "
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "gray transparent",
                }}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
                    <p className="text-center text-gray-400">
                      {loadingSteps[loadingStep]}
                    </p>
                  </div>
                ) : description.title ? (
                  <div className="space-y-4">
                    <p className="whitespace-pre-line">{description.title}</p>
                    <p className="whitespace-pre-line">
                      {description.mainDescription}
                    </p>
                    <p className="whitespace-pre-line">
                      {description.additionalFeatures}
                    </p>
                    <p className="whitespace-pre-line">
                      {description.locationAdvantages}
                    </p>
                    <p className="whitespace-pre-line">
                      {description.propertyHighlights}
                    </p>

                    <p className="whitespace-pre-line">
                      {description.conclusion}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">
                    {error ||
                      "Your property description will appear here after you generate the listing."}
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
