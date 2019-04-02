import React from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    return(
        <div>
            <header>
                This is your profile page!!
            </header>
            <section>
                <Link to ="/">
                    Home
                </Link>
            </section>
        </div>
    );
}

export default ProfilePage;