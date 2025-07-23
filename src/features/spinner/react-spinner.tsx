import { ClipLoader } from "react-spinners";

export const Spinner: React.FC = () => {
    
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <ClipLoader
                color="#ffffff"
                loading={true}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
