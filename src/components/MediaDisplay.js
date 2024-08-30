const MediaDisplay = ({ mediaUrl, mediaType }) => { // Set initial endpoint based on the prop

  if (!mediaUrl ) {
    mediaUrl = "http://localhost:5000/images/generated_image.png"
  }

  return (
    <div className="col-8">
      {mediaType === 'ImageMediaType' && <img src={mediaUrl} alt="Media content" className="img-fluid" />}
      {mediaType === 'video' && (
        <video controls className="img-fluid">
          <source src={mediaUrl} type="video/mp4" alt="Video Media Content" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default MediaDisplay;
