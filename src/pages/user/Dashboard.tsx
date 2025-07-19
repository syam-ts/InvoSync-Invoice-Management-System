import { useEffect, useState } from "react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import ClientCard from "../../components/user/ClientsCard";

interface IClients {
    companyName: string;
    currency: string;
    email: string;
    phone: number;
    panNumber: string;
}

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

    useEffect(() => {
        try {
            const getMyClientFunction = async () => {
                const response = await UserService.getMyClients();
 
                if (!response.success) {
                    toastError(response.message);
                } else {
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
            <div>
                  <h1 className="text-3xl text-center text-white py-6 font-bold">Client Cards</h1>
            </div>
            {
                clients.length > 1 && <ClientCard clients={clients} />
            }
        </div>
    )
};

export default Dashboard;
