import { MovimientosProvider } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <MovimientosProvider>
                    {children}
                </MovimientosProvider>
            </body>
        </html>
    );
}