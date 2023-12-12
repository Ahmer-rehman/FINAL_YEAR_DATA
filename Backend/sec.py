



def find_d(e, z):
    d = 1
    while (d * e - 1) % z != 0:
        d += 1
    return d

def mod_pow(base, exponent, modulus):
    result = 1
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % modulus
        base = (base * base) % modulus
        exponent //= 2
    return result

# Step 1: User input for prime numbers p and q
p = int(5)
q = int(7)

n = p * q
z = (p - 1) * (q - 1)

# Step 2: User input for public key e
e = int(input("Enter public key e (less than n and coprime to z): "))
d = find_d(e, z)

# Keys generated
print(f"Public key: ({n},{e})")
print(f"Private key: ({n},{d})")

# Step 3: User input for text
plaintext = input("Enter the word to encrypt (in lowercase): ")
ciphertext = []

# Step 4: User input for public key to encrypt
user_n, user_e = map(int, input("Enter the public key (format: n,e): ").split(","))

for char in plaintext:
    if char.isalpha():
        numeric_value = ord(char) - ord('a') + 1

        # Encryption using user-provided public key
        encrypted_value = mod_pow(numeric_value, user_e, user_n)
        ciphertext.append(str(encrypted_value))

print("Cipher Text: " + " ".join(ciphertext))

# Step 5: User input for private key to decrypt
user_n, user_d = map(int, input("Enter the private key (format: n,d): ").split(","))

# Decryption using user-provided private key
decrypted_text = ""

for cipher in ciphertext:
    encrypted_value = int(cipher)
    decrypted_value = mod_pow(encrypted_value, user_d, user_n)
    decrypted_char = chr(decrypted_value - 1 + ord('a'))
    decrypted_text += decrypted_char

print("Decrypted Text: " + decrypted_text)