/**
 * Enum com códigos de status HTTP padronizados
 * Organizado por categorias: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Errors), 5xx (Server Errors)
 */
export enum HttpStatusCode {
  // 1xx - Informational
  /** Continue - O servidor recebeu a solicitação inicial e o cliente deve continuar */
  CONTINUE = 100,
  /** Switching Protocols - O servidor está mudando protocolos conforme solicitado */
  SWITCHING_PROTOCOLS = 101,
  /** Processing - O servidor recebeu e está processando a solicitação */
  PROCESSING = 102,
  /** Early Hints - Usado para retornar alguns cabeçalhos de resposta antes da resposta final */
  EARLY_HINTS = 103,

  // 2xx - Success
  /** OK - Solicitação bem-sucedida */
  OK = 200,
  /** Created - Solicitação bem-sucedida e um novo recurso foi criado */
  CREATED = 201,
  /** Accepted - Solicitação aceita para processamento, mas ainda não foi concluída */
  ACCEPTED = 202,
  /** Non-Authoritative Information - Metainformações não provêm do servidor original */
  NON_AUTHORITATIVE_INFORMATION = 203,
  /** No Content - Solicitação bem-sucedida, mas não há conteúdo para retornar */
  NO_CONTENT = 204,
  /** Reset Content - O cliente deve resetar o documento que causou a solicitação */
  RESET_CONTENT = 205,
  /** Partial Content - O servidor está entregando apenas parte do recurso */
  PARTIAL_CONTENT = 206,
  /** Multi-Status - Múltiplos status para WebDAV */
  MULTI_STATUS = 207,
  /** Already Reported - Os membros de uma ligação DAV já foram enumerados */
  ALREADY_REPORTED = 208,
  /** IM Used - O servidor atendeu uma solicitação GET para o recurso */
  IM_USED = 226,

  // 3xx - Redirection
  /** Multiple Choices - Múltiplas opções para o recurso solicitado */
  MULTIPLE_CHOICES = 300,
  /** Moved Permanently - O recurso foi movido permanentemente para uma nova URL */
  MOVED_PERMANENTLY = 301,
  /** Found - O recurso foi encontrado em uma URL diferente temporariamente */
  FOUND = 302,
  /** See Other - O cliente deve fazer uma nova solicitação GET para a URL fornecida */
  SEE_OTHER = 303,
  /** Not Modified - O recurso não foi modificado desde a última solicitação */
  NOT_MODIFIED = 304,
  /** Use Proxy - O recurso solicitado deve ser acessado através de um proxy */
  USE_PROXY = 305,
  /** Temporary Redirect - O recurso foi temporariamente movido para outra URL */
  TEMPORARY_REDIRECT = 307,
  /** Permanent Redirect - O recurso foi permanentemente movido para outra URL */
  PERMANENT_REDIRECT = 308,

  // 4xx - Client Errors
  /** Bad Request - A solicitação não pôde ser entendida pelo servidor */
  BAD_REQUEST = 400,
  /** Unauthorized - A solicitação requer autenticação do usuário */
  UNAUTHORIZED = 401,
  /** Payment Required - Reservado para uso futuro */
  PAYMENT_REQUIRED = 402,
  /** Forbidden - O servidor entendeu a solicitação, mas se recusa a autorizá-la */
  FORBIDDEN = 403,
  /** Not Found - O recurso solicitado não foi encontrado */
  NOT_FOUND = 404,
  /** Method Not Allowed - O método especificado na solicitação não é permitido */
  METHOD_NOT_ALLOWED = 405,
  /** Not Acceptable - O recurso solicitado não está disponível no formato aceito */
  NOT_ACCEPTABLE = 406,
  /** Proxy Authentication Required - O cliente deve se autenticar com o proxy */
  PROXY_AUTHENTICATION_REQUIRED = 407,
  /** Request Timeout - O servidor expirou aguardando a solicitação */
  REQUEST_TIMEOUT = 408,
  /** Conflict - A solicitação não pôde ser processada devido a um conflito */
  CONFLICT = 409,
  /** Gone - O recurso solicitado não está mais disponível e não retornará */
  GONE = 410,
  /** Length Required - O servidor requer que o comprimento do conteúdo seja especificado */
  LENGTH_REQUIRED = 411,
  /** Precondition Failed - Uma ou mais pré-condições na solicitação falharam */
  PRECONDITION_FAILED = 412,
  /** Payload Too Large - A entidade da solicitação é maior do que o servidor permite */
  PAYLOAD_TOO_LARGE = 413,
  /** URI Too Long - A URI da solicitação é muito longa para o servidor processar */
  URI_TOO_LONG = 414,
  /** Unsupported Media Type - O formato da mídia não é suportado pelo servidor */
  UNSUPPORTED_MEDIA_TYPE = 415,
  /** Range Not Satisfiable - O servidor não pode fornecer a porção solicitada do arquivo */
  RANGE_NOT_SATISFIABLE = 416,
  /** Expectation Failed - O servidor não pode atender aos requisitos do cabeçalho Expect */
  EXPECTATION_FAILED = 417,
  /** I'm a teapot - Código de status de piada do RFC 2324 */
  IM_A_TEAPOT = 418,
  /** Misdirected Request - A solicitação foi direcionada para um servidor incapaz de produzir uma resposta */
  MISDIRECTED_REQUEST = 421,
  /** Unprocessable Entity - A solicitação estava bem formada, mas continha erros semânticos */
  UNPROCESSABLE_ENTITY = 422,
  /** Locked - O recurso que está sendo acessado está bloqueado */
  LOCKED = 423,
  /** Failed Dependency - A solicitação falhou devido à falha de uma solicitação anterior */
  FAILED_DEPENDENCY = 424,
  /** Too Early - Indica que o servidor não está disposto a arriscar processar uma solicitação que pode ser repetida */
  TOO_EARLY = 425,
  /** Upgrade Required - O cliente deve mudar para um protocolo diferente */
  UPGRADE_REQUIRED = 426,
  /** Precondition Required - O servidor de origem requer que a solicitação seja condicional */
  PRECONDITION_REQUIRED = 428,
  /** Too Many Requests - O usuário enviou muitas solicitações em um período de tempo */
  TOO_MANY_REQUESTS = 429,
  /** Request Header Fields Too Large - O servidor não está disposto a processar a solicitação porque seus campos de cabeçalho são muito grandes */
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  /** Unavailable For Legal Reasons - O usuário solicitou um recurso que não pode ser fornecido legalmente */
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,

  // 5xx - Server Errors
  /** Internal Server Error - O servidor encontrou uma condição inesperada */
  INTERNAL_SERVER_ERROR = 500,
  /** Not Implemented - O servidor não suporta a funcionalidade necessária para atender à solicitação */
  NOT_IMPLEMENTED = 501,
  /** Bad Gateway - O servidor, ao atuar como gateway ou proxy, recebeu uma resposta inválida */
  BAD_GATEWAY = 502,
  /** Service Unavailable - O servidor está temporariamente indisponível */
  SERVICE_UNAVAILABLE = 503,
  /** Gateway Timeout - O servidor, ao atuar como gateway ou proxy, não recebeu uma resposta a tempo */
  GATEWAY_TIMEOUT = 504,
  /** HTTP Version Not Supported - O servidor não suporta a versão do protocolo HTTP */
  HTTP_VERSION_NOT_SUPPORTED = 505,
  /** Variant Also Negotiates - Erro de configuração do servidor */
  VARIANT_ALSO_NEGOTIATES = 506,
  /** Insufficient Storage - O servidor não consegue armazenar a representação necessária */
  INSUFFICIENT_STORAGE = 507,
  /** Loop Detected - O servidor detectou um loop infinito ao processar a solicitação */
  LOOP_DETECTED = 508,
  /** Not Extended - Extensões adicionais à solicitação são necessárias */
  NOT_EXTENDED = 510,
  /** Network Authentication Required - O cliente precisa se autenticar para obter acesso à rede */
  NETWORK_AUTHENTICATION_REQUIRED = 511
}
