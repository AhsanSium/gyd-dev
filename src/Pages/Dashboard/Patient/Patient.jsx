import ListGroup from 'react-bootstrap/ListGroup';

const Patient = ({ data }) => {
    return (
        <div>
            <h3>Patient Dashboard</h3>
            <p>Welcome {data.patientName && data.patientName}</p>

            <div className="mt-5">
                <ListGroup as='ol' numbered >
                    {
                        data.email &&
                        Object.keys(data)?.map(function (keyName, keyIndex) {
                            return (
                                <ListGroup.Item>
                                    <h5>
                                        {keyName} :
                                    </h5>

                                    <h6>{data[keyName]}</h6>

                                </ListGroup.Item>
                            )
                        })
                    }

                </ListGroup>
            </div>

        </div>
    )
}

export default Patient;