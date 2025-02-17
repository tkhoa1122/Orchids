import React, { Component } from 'react';

class UserShow extends Component {
    render() {
        return (
            <div>
                <label>
                    Enter User ID:
                    <input
                        type="number"
                        value={userId} // Thay id thành userId
                        onChange={(e) => setUserId(Number(e.target.value))}
                    />
                </label>
                <User userId={userId} />
            </div>
        );
    }
}

export default UserShow;
