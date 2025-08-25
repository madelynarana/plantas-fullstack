import React from 'react'

const ApiChatBoot = () => {
    return (
        <div id='section4' className='section  lighten-4 scrollspy'>
            <div className='container'>
                <h4 className='center green-text text-darken-3'>ChatBoot</h4>
                <div className='row'>
                    <div className='col s12 m6'>
                        <div className='card'>
                            <div className='card-content'>
                                <span className='card-title'>Escribe tu pregunta</span>
                                <textarea className='materialize-textarea' placeholder='Escribe tu mensaje...' style={{ height: '45px;' }}></textarea>
                                <bottom className='btn green' style={{ marginTop: '8px;' }}>Enviar</bottom>
                            </div>
                        </div>
                    </div>
                    <div className='col s12 m6'>
                        <div className='card'>
                            <div className='card-content'>
                                <span className='card-title'>Respuestas Chat</span>
                                <div className='materialize-textarea' placeholder='Escribe tu mensaje...' style={{ height: '45px;' }}>
                                    <ul className='collection with-header'>
                                        <li className='collection-item'>Ahorita se encuentra lloviendo</li>
                                        <li className='collection-item'>El mejor día para podar es mañana</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col s12 m6'>
                        <ul className='collection with-header'>
                            <li className='collection-header'>
                                <h5>Historial de chats</h5>
                            </li>
                            <li className='collection-item'>¿Cómo es el clima hoy?</li>
                            <li className='collection-item'>¿Cuándo podar?</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApiChatBoot