import React, { useEffect, useState } from 'react';
import axios from "axios";

const FormsTreino = () => {
    const [treino, setTreino] = useState([]);
    const [filteredTreino, setFilteredTreino] = useState([]); 

    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json")
            .then(response => {
                console.log(response.data);
                setTreino(response.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const imageBaseUrl = 'https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/';

    const [category, setCategory] = useState('');
    const [nivel, setNivel] = useState('');
    const [musculo, setMusculo] = useState('');
    const [movimento, setMovimento] = useState('');

    function handleCategory(e) {
        setCategory(e.target.value);
    }
    function handleNivel(e) {
        setNivel(e.target.value);
    }
    function handleMusculo(e) {
        setMusculo(e.target.value);
    }
    function handleMovimento(e) {
        setMovimento(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const results = treino.filter(t => 
            (category === '' || t.category === category) &&
            (nivel === '' || t.level === nivel) &&
            (movimento === '' || t.force === movimento) &&
            (musculo === '' || (t.primaryMuscles && t.primaryMuscles.includes(musculo))) 
        );
        setFilteredTreino(results);
    }

    return (
        <>
            <section className='section-input-treinos'>
                <h1>O Melhor Treino Para Você, Sempre Ao Seu Alcance!</h1>
                <form className='forms-treino' onSubmit={handleSubmit}>
                    <div className='row-1'>
                        <label htmlFor="name-train">Nome do Treino</label>
                        <input type="text" id="name-train" placeholder='Digite o nome do seu treino' />
                    </div>

                    <div className='row-2'>
                        <div>
                            <label htmlFor="exp">Nível de Experiência</label>
                            <select id="exp" onChange={handleNivel} value={nivel}>
                                <option value="">Selecione um nível</option>
                                {[...new Set(treino.map(t => t.level))].map((level, index) => (
                                    <option key={index} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category">Categoria</label>
                            <select id="category" onChange={handleCategory} value={category}>
                                <option value="">Selecione uma categoria</option>
                                {[...new Set(treino.map(t => t.category))].map((categoria, index) => (
                                    <option key={index} value={categoria}>{categoria}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row-3'>
                        <div>
                            <label htmlFor="muscprim">Músculo Principal</label>
                            <select id="muscprim" onChange={handleMusculo} value={musculo}>
                                <option value="">Selecione um músculo</option>
                                {[...new Set(treino.flatMap(t => t.primaryMuscles))].map((muscprim, index) => ( 
                                    <option key={index} value={muscprim}>{muscprim}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="forca">Tipo de Movimento</label>
                            <select id="forca" onChange={handleMovimento} value={movimento}>
                                <option value="">Selecione um tipo</option>
                                {[...new Set(treino.map(t => t.force))].map((force, index) => (
                                    <option key={index} value={force}>{force}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button type='submit'>Enviar</button>
                </form>
            </section>
            <section className='section-cards-treinos'>
                <div className="card-grid">
                    {
                        filteredTreino.map((item, index) => (
                            <div className="card" key={index}>
                                <div className="card-image">
                                    <img src={`${imageBaseUrl}${item.id}/images/1.jpg`} alt={item.name} />
                                </div>
                                <div className="card-content">
                                    <h3>{item.name}</h3>
                                    <p>{item.instructions}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    );
}

export default FormsTreino;
