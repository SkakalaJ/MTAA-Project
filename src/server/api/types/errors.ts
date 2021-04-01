export enum ELoginError {
    Empty = "Username or password empty!",
    Invalid = "Provided username or password is invalid!",
    Blocked = "Account has been blocked. Please contact our support!",
    Request = "Request parameters invalid!"
}

export enum ERegisterError {
    Empty = "Username and password are required!",
    Invalid = "Provided username or password is invalid! Only alphanumeric characters are allowed.",
    Used = "The username already exists. Please use a different username.",
    ShortPasswd = "Short password. Minimum password length is at least 8 characters.",
    LongPasswd = "Password is too long",
    WeakPasswd = "Weak password. Password must contain at least one uppercase letter, lowercase letter and number",
    Email = "Email is not valid!",
    Request = "Request parameters invalid!",
    LongUsername = "Username is too long",
    ShortUsername = "Short password. Minimum password length is at least 5 characters.",
    AlphaUsername = "Username is invalid! Only alphabetical charactes are allowed."
}

export enum ELogoutError {
    Request = "Provided user bid or username is invalid!",
}

export enum EAccessError {
    InvalidToken = "Invalid authorization token provided.",
}

export enum EPasswdUpdateError {
    UpdateServerError = "Password update server error!",
    WrongOldPassword = "Old password invalid!",
    Same = "Old and new passwords are the same",
    ShortPasswd = "Short password. Minimum password length is at least 8 characters.",
    LongPasswd = "Password is too long",
    WeakPasswd = "Weak password. Password must contain at least one uppercase letter, lowercase letter and number",
    Request = "Request parameters invalid!",
}

export enum EMessageError {
    Empty = "Message is empty!",
    Request = "Request parameters invalid!",
    Permission = "Unauthorized operation!",
    ServerError = "Operation unsuccessful!",
}