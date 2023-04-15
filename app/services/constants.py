class Gpt3_5Constants:
    MODEL: str = "gpt-3.5-turbo"
    # roles
    SYSTEM_ROLE: str = "system"
    ASSISTANT_ROLE: str = "assistant"
    USER_ROLE: str = "user"
    # gpt3.5-turbo settings
    TEMPERATURE: float = 0.5
    MAX_TOKENS: int = 100
    # prompts
    DEFAULT_SYSTEM_PROMPT: str = """
    Only write code.
    """
