import loading from "../../assets/loading.json"
import Lottie from "react-lottie";

function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className="loading-animation">
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
  }

export default Loading;