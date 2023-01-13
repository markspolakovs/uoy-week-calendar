import {app} from "./app";

const port = process.env.PORT ?? 9000;

app.listen(port, () => {
    console.log(`UoY Week Numbers listening on ${port}`);
})
