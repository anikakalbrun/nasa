interface VideoProps {
  src: string;
  className?: string;
}

export default function Video({
  src,
  className = "w-full image-container-large",
}: VideoProps) {
  return (
    <div>
      <iframe
        title="YouTube Video Player"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={className}
      ></iframe>
    </div>
  );
}
