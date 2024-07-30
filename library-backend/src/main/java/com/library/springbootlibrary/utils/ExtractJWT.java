package com.library.springbootlibrary.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {

    public static String payloadJWTExtraction(String token, String extraction) {

        token.replace("Bearer", "");

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for (String entry : entries) {
            String[] keyvalue = entry.split(":");
            if (keyvalue[0].equals(extraction)) {

                int remove = 1;

                if (keyvalue[1].endsWith("}")) {
                    remove = 2;
                }
                keyvalue[1] = keyvalue[1].substring(0, keyvalue[1].length() - remove);
                keyvalue[1] = keyvalue[1].substring(1);

                map.put(keyvalue[0], keyvalue[1]);
            }
        }
        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }
        return null;
    }
}

