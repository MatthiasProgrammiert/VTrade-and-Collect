import express, { Request, Response } from "express";
import {init} from "node-persist";

let storageLoadingListeners:{res:Function, rej:Function}[] = [];
let initialzedStorage = false;
init({dir:"persistent-storage"}).then(function(res) {
  initialzedStorage = true;
  storageLoadingListeners.forEach(l => l.res());
}).catch(function(err) {
  initialzedStorage = false;
  storageLoadingListeners.forEach(l => l.rej(err));
  console.error("initialization of the storage failed")
  console.error(err);
  process.exit();
})
async function waitForInit() {
  if (initialzedStorage)
      return;
  return new Promise(function(res, rej) {
    storageLoadingListeners.push({res, rej});
  })
}

const app = express();

app.use(express.json());
app.use((req, res, next) => {

})
app.get("/", async (req: Request, res: Response) => {
  await waitForInit();
  res.json({ message: "Hello TypeScript Express!" });
});

export default app;