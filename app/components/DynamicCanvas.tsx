import dynamic from "next/dynamic";

const DynamicCanvas = dynamic(() => import("./CanvasComponent"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

export default DynamicCanvas;
