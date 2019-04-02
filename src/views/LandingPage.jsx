import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
    <div>
        <header>
        Welcome to Author's haven frontend
        </header>
        <section>
            <Link to ="profile">
                Profile
            </Link>
        </section>
    </div>
    );
}

export default LandingPage;