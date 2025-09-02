"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Linkedin, Share2, Twitter, X } from "lucide-react";
import { useState } from "react";

interface FloatingShareButtonProps {
  url: string;
  title: string;
}

export function FloatingShareButton({
  url = "https://example.com/blog-post",
  title = "Check out this awesome blog post!",
}: FloatingShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex flex-col-reverse items-end space-y-4 space-y-reverse mb-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare("twitter")}
          aria-label="Share on Twitter"
          className="bg-white dark:bg-gray-800 shadow-lg h-12 w-12"
        >
          <Twitter className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare("facebook")}
          aria-label="Share on Facebook"
          className="bg-white dark:bg-gray-800 shadow-lg h-12 w-12"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleShare("linkedin")}
          aria-label="Share on LinkedIn"
          className="bg-white dark:bg-gray-800 shadow-lg h-12 w-12"
        >
          <Linkedin className="h-5 w-5" />
        </Button>
      </div>
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close share menu" : "Open share menu"}
        className="shadow-lg h-12 w-12"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
      </Button>
    </div>
  );
}
