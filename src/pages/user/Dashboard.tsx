import { useEffect, useState } from "react";
import { UserService } from "../../services/api/userServices";
import { toastError } from "../../utils/sonner/toastError";
import ClientCard from "../../components/user/ClientsCard";
import type { IClients } from "../../helper/interfaces/IClient";

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
                <h1 className="text-4xl text-center text-white pt-20 font-bold">
                    Dashboard
                </h1>
            </div>
            {clients.length > 1 && <ClientCard clients={clients} />}
        </div>
    );
};

export default Dashboard;
