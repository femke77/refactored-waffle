

export default function Channel() {

    const handleKeyUp = async (evt) => {
        if(evt.keyCode === 13) {

        }
    }
    return (
        <>
            <input
                type="text"
                placeholder="+ New message"
                onKeyUp={handleKeyUp}
            />
            {/* {error && <div>{error.message}</div>} */}
        </>
    )
}