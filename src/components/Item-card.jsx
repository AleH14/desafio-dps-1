const ItemCard = () => {
    return (
        <div className="text-left d-flex align-items-center justify-content-between p-3">
            <div className="d-flex align-items-center">
                <img src="/ale.jpg" className="rounded-circle me-2" alt="Your Image" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                <div className="d-flex flex-column">
                    <span className="fw-bold">Gasto o Ingreso</span>
                    <small className="text-muted">categoria </small>
                </div>
            </div>
            
            <div className="d-flex align-items-center">
                <div className="d-flex flex-column me-3">
                    <span className="fw-bold">$250.00</span>
                    <small className="text-muted">15/07/2025</small>
                </div>
                <button className="btn btn-outline-danger btn-sm">
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    )
}

export default ItemCard;