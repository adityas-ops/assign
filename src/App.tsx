import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";

export default function App() {
  return <MantineProvider theme={theme}>
     <div style={{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        gap:"60px",
        padding:"60px",
    }}>
        <div style={{
            width:"50%"
        }}>
              <Table1/>
        </div>
        <div style={{
            width:"50%"
        }}>
              <Table2/>
        </div>



    </div>
  </MantineProvider>;
}
