import { useEffect, useState } from "react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import ClientCard from "../../components/user/ClientsCard";
import type { IClients } from "../../helper/interfaces/IClient";
import { Spinner } from "../../features/spinner/react-spinner";

const Dashboard = () => {
    const [clients, setClients] = useState<IClients[]>([
        {
            companyName: "",
            currency: "",
            email: "",
            phone: 0,
            panNumber: "",
        },
    ]);
      const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);


    useEffect(() => {
        setLoadingSpinner(true)
        try {
            const getMyClientFunction = async () => {
                const response = await UserService.getMyClients();

                if (!response.success) {
                    setLoadingSpinner(false)
                    toastError(response.message);
                } else {
                    setLoadingSpinner(false)
                    setClients(response.clients);
                }
            };

            getMyClientFunction();
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }, []);

    return (
        <div className="w-full h-screen">
            {
                loadingSpinner &&  <Spinner />
            }
            <div>
                <h1 className="text-4xl text-center text-white pt-20 font-bold">
                    Dashboard
                </h1>
            </div>
            {clients.length > 1 && <ClientCard clients={clients} />}
        </div>
    );
};

export default Dashboard;
