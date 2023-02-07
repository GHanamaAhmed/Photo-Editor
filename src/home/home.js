import React, { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Home() {
    const [state, setState] = useState({
        display: ["hidden", ""]
    })
    const location = useLocation()
    const saturate = useRef()
    const contrast = useRef()
    const brightness = useRef()
    const sepia = useRef()
    const grayscale = useRef()
    const blur = useRef()
    const hrotate = useRef()
    const upload = useRef()
    const canvas = useRef()
    const navigate = useNavigate()
    useLayoutEffect(() => {
        async function authentication() {
            let req = location.state
            let data = await axios.post(
                "http://localhost/SERVICE/photoshop/src/signin/signin.php",
                req
            );
            if (!data.data?.res && !req?.googlelog) {
                navigate("/sign")
            }
        }
        authentication()
    }, []);
    function update() {
        console.log(hrotate.current.value);
        upload.current.style.filter = `
        saturate(${saturate.current.value}%)
        brightness(${brightness.current.value}%)
        contrast(${contrast.current.value}%)
        sepia(${sepia.current.value}%)
        grayscale(${grayscale.current.value / 100})
        blur(${blur.current.value / 10}px)
        hue-rotate(${hrotate.current.value}deg)
        `
        let cnx = canvas.current.getContext("2d")
        cnx.filter = `
        saturate(${saturate.current.value}%)
        brightness(${brightness.current.value}%)
        contrast(${contrast.current.value}%)
        sepia(${sepia.current.value}%)
        grayscale(${grayscale.current.value / 100})
        blur(${blur.current.value / 10}px)
        hue-rotate(${hrotate.current.value}deg)
        `
        cnx.drawImage(upload.current, 0, 0, canvas.current.width, canvas.current.height)
    }
    function uploadfile(e) {
        let file = new FileReader();
        let cnx = canvas.current.getContext("2d")
        saturate.current.value = 100
        brightness.current.value = 100
        contrast.current.value = 100
        sepia.current.value = 0
        grayscale.current.value = 0
        blur.current.value = 0
        hrotate.current.value = 0
        if (e.target.files[0]) {
            file.readAsDataURL(e.target.files[0])
            setState({ ...state, display: ["", "hidden"] })
            console.log(upload.current.src);
            file.onload = () => {
                upload.current.src = file.result
            }
            upload.current.onload = () => {
                canvas.current.width = upload.current.width
                canvas.current.height = upload.current.height
                cnx.drawImage(upload.current, 0, 0, canvas.current.width, canvas.current.height)
            }
        }
        update()
    }
    return (
        <div className="h-screen flex flex-col">
            <div className="h-full w-full flex justify-center items-center py-7">
                <div className="grid grid-cols-1 md:grid-cols-3 w-2/3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 py-6 md:px-16 px-3">
                    <div className="col-span-2 flex flex-col items-center justify-center my-2">
                        <img ref={upload} className={`${state.display[0]}`} />
                        <canvas ref={canvas} className={`hidden`}></canvas>
                        <div className={`flex items-center justify-center w-full ${state.display[1]}`}>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" onChange={uploadfile} type="file" className="hidden" />
                            </label>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="dropzone-file" className={`${state.display[0]} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Change</label>
                            <a onClick={(e) => { e.target.href = canvas.current.toDataURL() }} download className={`${state.display[0]} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Download</a>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col">
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Saturate</p>
                            <input type={"range"} ref={saturate} defaultValue={100} max={200} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Contrast</p>
                            <input type={"range"} ref={contrast} defaultValue={100} max={200} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Brightness</p>
                            <input type={"range"} ref={brightness} defaultValue={100} max={200} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Sepia</p>
                            <input type={"range"} ref={sepia} defaultValue={0} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Grayscale</p>
                            <input type={"range"} ref={grayscale} defaultValue={0} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Blur</p>
                            <input type={"range"} ref={blur} defaultValue={0} onChange={update} className="w-5/6 self-center" />
                        </div>
                        <div className="flex flex-col justify-center gap-y-2">
                            <p className="text-end">Hue Rotate</p>
                            <input type={"range"} max={360} ref={hrotate} defaultValue={0} onChange={update} className="w-5/6 self-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}