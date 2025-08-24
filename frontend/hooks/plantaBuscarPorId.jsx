import { useEffect, useState } from 'react';

export const plantaBuscarPorId = ( idPlant ) => {
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
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
            const {name, taxonomy, image_url } = await getDatos.json();
            setName(name);
            setTaxonomy(taxonomy);
            setImageUrl(image_url);
        };

        getPlantaPorId();
    }, [idPlant]);

    return { 
        name, 
        taxonomy, 
        imageUrl 
    };
};