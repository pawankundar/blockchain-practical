import hashlib

uinp = lambda a : hashlib.sha256(a.encode()).hexdigest()
userInp = str(input("Enter the text :"))
print("Sha256 Encrypted Hash is : ", uinp(userInp))