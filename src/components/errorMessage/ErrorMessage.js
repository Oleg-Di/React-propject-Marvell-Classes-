import img from './error.gif'

const ErrorMessage = () => {

    return(
        <img style={{display: 'block', widows: 250, height: 250, objectFit: 'contain', margin: '0 auto'}} alt='img' src={img}/>
    )
}

export default ErrorMessage