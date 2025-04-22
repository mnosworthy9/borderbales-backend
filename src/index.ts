import "module-alias/register"; // Import module-alias/register at the top of your entry file
import logger from "jet-logger";
import server from "./server";

import { myDataSource } from "./database/app-data-source";

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// Constants
const serverStartMsg = "Express server started on port: ",
        port = (process.env.PORT || 4000);

// Start server
server.listen(port, () => {
    logger.info(serverStartMsg + port);
});
