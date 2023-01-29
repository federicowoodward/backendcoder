class ErrorFactory {
    getError(err) {
        return {"error": true, "message": err, result: "NO"}
    }

    getErrorExtra(err, info) {
        let extra = info || ""
        return {"error": true, "message": err, "code": err.code, "extra": extra, result:"NO" }
    }

    getStatusError(err, status) {
        return {"status": status, "error": err}
    }
}
let errorFactory; 
export default errorFactory = new ErrorFactory()
