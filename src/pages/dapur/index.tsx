import { listMeja } from "@/constants/meja";
import CommonLayout from "@/layout/common";

function Dapur() {
  return (
    <CommonLayout>
      <section className="flex">
        {listMeja.map((m, i) => (
          <div key={i} className="w-1/3">
            <h3 className="text-xl font-semibold leading-none">{m.label}</h3>
          </div>
        ))}
      </section>
    </CommonLayout>
  );
}

export default Dapur;
