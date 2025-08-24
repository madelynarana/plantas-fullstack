import { useEffect, useState } from 'react';

export const plantaBuscarPorId = (idPlant) => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [taxonomy, setTaxonomy] = useState({
        class: "",
        genus: "",
        order: "",
        family: "",
        phylum: "",
        kingdom: ""
    });

    useEffect(() => {

        const getPlantaPorId = async () => {
            const getDatos = await fetch('http://localhost:3000/planta/' + idPlant);
            const { name, taxonomy, image_url } = await getDatos.json();
            setName(name);
            setTaxonomy(taxonomy);
            setImageUrl(image_url);
        };

        getPlantaPorId();
    }, [idPlant]);


    const actualizarPlantaPorId = async () => {
            const putDatos = await fetch('http://localhost:3000/planta/'+idPlant, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                image_url: imageUrl,
                taxonomy
            })
        });

        const respueta = await putDatos.json();
        return respueta;
    };


    return {
        name,
        setName,
        imageUrl,
        setImageUrl,
        taxonomy,
        setTaxonomy,
        actualizarPlantaPorId
    };
};