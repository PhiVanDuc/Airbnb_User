// import { Inter } from "next/font/google";
import "./globals.css";

import { cookies } from "next/headers";

import DateRangeProvider from "@/context/DateRangeProvider";
import ReservationProvider from "@/context/ReservationProvider";
import TokenProvider from "@/context/TokenProvider";
import SocketProvider from "@/context/SocketProvider";
import ConversationsProvider from "@/context/ConversationsProvider";
import MessagesProvider from "@/context/MessagesProvider";
import NotificationsProvider from "@/context/NotificationsProvider";
import SeenInfoProvider from "@/context/SeenInfoProvider";
import PropertiesInfoProvider from "@/context/PropertiesInfoProvider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb Clone",
  description: "Airbnb Clone",
};

export default function RootLayout({ children }) {
    const access_token = cookies().get("access-user")?.value;
    const refresh_token = cookies().get("refresh-user")?.value;

    return (
        <html lang="en">
            <body>
                <TokenProvider tokens={{ access_token, refresh_token }}>
                    <SocketProvider>
                        <PropertiesInfoProvider>
                            <DateRangeProvider>
                                <ReservationProvider>
                                    <NotificationsProvider>
                                        <ConversationsProvider>
                                            <MessagesProvider>
                                                <SeenInfoProvider>
                                                    { children }
                                                </SeenInfoProvider>
                                            </MessagesProvider>
                                        </ConversationsProvider>
                                    </NotificationsProvider>
                                </ReservationProvider>
                            </DateRangeProvider>
                        </PropertiesInfoProvider>
                    </SocketProvider>
                </TokenProvider>
            </body>
        </html>
    );
}