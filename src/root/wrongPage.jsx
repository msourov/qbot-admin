import { Result, Button } from 'antd';

const WrongPage = () => {
    return ( 
        <div style={{display: 'flex',justifyContent: 'center'}}>
            <div style={{marginTop: '15%'}}>
                <Result
                    status="warning"
                    title="Something went wrong!"
                    extra={
                    <Button type="primary" key="console" onClick={() => window.history.back()}>
                        Try Again
                    </Button>
                    }
                />
            </div>
        </div>

     );
}
 
export default WrongPage;